import React from "react";

import styles from "./component.module.scss";

import { PropsType } from "./types";

import { MiniLoading } from "@/6.shared";

export function UploadWrapper({ children, onUpload, multiple, accept }: PropsType) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (files.length > 0) {
      setIsLoading(true);
      onUpload(files);
      setIsLoading(false);
    }
  }, [files]);

  return (
    <>
      {isLoading ? (
        <MiniLoading />
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
