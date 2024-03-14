import React from "react";
import styles from "./UploadWrapper.module.scss";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ky from "ky";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import useFiles from "@/hooks/useFiles";

type PropsType = {
  children: React.ReactNode;
  onUpload: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  loading: React.ReactNode;
};

export default function UploadWrapper({
  children,
  onUpload,
  multiple,
  accept,
  loading,
}: PropsType) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

<<<<<<< Updated upstream
=======
  const generateUrl = useMutation(api.file.generateUploadUrl);
  const create = useMutation(api.file.createFile);

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

>>>>>>> Stashed changes
  React.useEffect(() => {
    if (files.length > 0) {
      setIsLoading(true);
      onUpload(files);
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
