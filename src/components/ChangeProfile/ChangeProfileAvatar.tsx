import React from "react";
import styles from "@/components/ChangeProfile/ChangeProfile.module.scss";
import avatarImage from "../../../public/logo-avatar.svg";
import { ImagePlus } from "lucide-react";
import UploadWrapper from "@/components/Upload/UploadWrapper";
import Portal from "@/components/Portal/Portal";
import Crop from "@/components/Crop/Crop";
import useFiles from "@/hooks/useFiles";
import { Doc } from "../../../convex/_generated/dataModel";
import MiniLoading from "@/components/Loading/MiniLoading";
import Image from "next/image";

export default function ChangeProfileAvatar({
  avatar,
  done,
}: {
  avatar: string;
  done: (file: Doc<"file">) => void;
}) {
  const [file, setFile] = React.useState<File | null>(null);
  const [isDone, setIsDone] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const [newImage, setNewImage] = React.useState("");

  const { uploadBlob } = useFiles();

  const toConvex = async (c: HTMLCanvasElement) => {
    setLoad(true);
    c.toBlob(async (blob) => {
      if (blob) {
        const files = await uploadBlob([blob]);
        console.log(files);
        done(files[0]);
        setNewImage(files[0].url);
        setFile(null);
      } else {
        console.log("blob не явился к нам");
      }
    });
  };

  return (
    <>
      {newImage ? (
        <Image
          src={newImage}
          alt={"new avatar"}
          className={styles.newImage}
          width={100}
          height={100}
        />
      ) : (
        <UploadWrapper
          loading={<MiniLoading />}
          onUpload={(files) => {
            if (files.length === 1) {
              setFile(files[0]);
            }
          }}
          multiple={false}
          accept={"image/*"}
        >
          <div className={styles.imageBlock}>
            <div
              className={styles.background}
              style={{
                backgroundImage: `url(${avatar || avatarImage.src})`,
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className={styles.fill} />
            <ImagePlus size={40} className={styles.lucideImage} />
          </div>
        </UploadWrapper>
      )}

      {file && (
        <Portal
          title={"Crop Avatar"}
          close={() => setFile(null)}
          isDone={!load}
          done={() => setIsDone(true)}
        >
          {load ? (
            <MiniLoading />
          ) : (
            <Crop file={file} isDone={isDone} done={toConvex} />
          )}
        </Portal>
      )}
    </>
  );
}
