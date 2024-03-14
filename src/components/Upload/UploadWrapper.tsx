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
