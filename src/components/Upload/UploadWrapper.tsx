import React from "react";
import styles from "./UploadWrapper.module.scss";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ky from "ky";
import { Doc, Id } from "../../../convex/_generated/dataModel";
export default function UploadWrapper({
  children,
  onLoad,
  multiple,
  accept,
  loading,
}: {
  children: React.ReactNode;
  onLoad: (urls: Doc<"files">[]) => void;
  multiple?: boolean;
  accept?: string;
  loading: React.ReactNode;
}) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const generateUrl = useMutation(api.files.generateUploadUrl);
  const create = useMutation(api.files.createFile);

  const uploadFiles = async () => {
    setIsLoading(true);
    const res: Doc<"files">[] = [];
    const uploadUrl = await generateUrl();
    for (const file of files) {
      console.log(file.name);
      console.log(file.size);
      const result: { storageId: Id<"_storage"> } = await ky
        .post(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type || "application/octet-stream" },
          body: file,
        })
        .json();
      const data = await create({
        storageId: result.storageId,
        name: file.name,
        size: file.size,
      });
      if (data) res.push(data);
    }
    onLoad(res);
  };

  React.useEffect(() => {
    if (files.length > 0) {
      uploadFiles();
    }
  }, [files]);

  return (
    <>
      {isLoading ? (
        <>{loading}</>
      ) : (
        <>
          <input
            type="file"
            id="upload"
            className={styles.upload}
            multiple={multiple}
            accept={accept}
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
          />
          <label htmlFor="upload">{children}</label>
        </>
      )}
    </>
  );
}
