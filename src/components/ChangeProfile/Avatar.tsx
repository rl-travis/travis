import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import UploadWrapper from "@/components/UploadWrapper/UploadWrapper";
import { Check, ImagePlus } from "lucide-react";
import Portal from "@/components/Portal/Portal";
import { CropperType } from "@/components/Crop/cropper";
import Crop from "@/components/Crop/Crop";
import useFiles from "@/hooks/useFiles";
import { Doc } from "../../../convex/_generated/dataModel";
import MiniLoading from "@/components/Loading/MiniLoading";
export default function Avatar({
  avatar,
  setAvatarDoc,
}: {
  avatar: string;
  setAvatarDoc: (file: Doc<"file">) => void;
}) {
  const [file, setFile] = React.useState<File | null>(null);
  const [avatarValue, setAvatarValue] = React.useState(avatar);
  const [loading, setLoading] = React.useState(false);
  const cropper = React.useRef<CropperType | null>(null);
  const { uploadBlob } = useFiles();
  return (
    <div>
      <div className={styles.avatarBlock}>
        <Image
          priority
          src={avatarValue}
          alt="avatar"
          width={120}
          height={120}
          className={styles.image}
        />
        {loading ? (
          <MiniLoading className={styles.avatarBtn} />
        ) : (
          <UploadWrapper
            onUpload={(files) => {
              if (files.length > 0) setFile(files[0]);
            }}
            accept="image/*"
            multiple={false}
          >
            <ImagePlus size={16} className={styles.avatarBtn} />
          </UploadWrapper>
        )}
      </div>
      {file && (
        <Portal
          close={() => {
            setFile(null);
            cropper.current = null;
          }}
          title={"12"}
        >
          <Crop file={file} cropp={cropper} />
          <button
            className={styles.avatarDone}
            onClick={() => {
              if (cropper.current) {
                setLoading(true);
                const c = cropper.current!.crop();
                c.toBlob(async (blob) => {
                  if (blob) {
                    const data = await uploadBlob([blob]);
                    if (data.length > 0) {
                      setAvatarValue(data[0].url);
                      setAvatarDoc(data[0]);
                    }
                    setLoading(false);
                  } else {
                    setLoading(false);
                  }
                });
                cropper.current!.removeHandlers();
              }
              setFile(null);
              cropper.current = null;
            }}
          >
            <Check width={20} />
          </button>
        </Portal>
      )}
    </div>
  );
}
