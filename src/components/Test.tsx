import React from "react";
import Crop from "@/components/Crop/Crop";
import styles from "./Test.module.scss";
import Portal from "@/components/Portal/Portal";
export default function Test() {
  const [file, setFile] = React.useState<File | null>(null);
  const [isDone, setIsDone] = React.useState(false);
  return (
    <div className={styles.wrapper}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />
      {file && (
        <Portal
          title="Crop Avatar"
          done={() => setIsDone(true)}
          close={() => {
            setFile(null);
          }}
        >
          <Crop file={file} isDone={isDone} done={(c) => console.log(c)} />
        </Portal>
      )}
    </div>
  );
}
