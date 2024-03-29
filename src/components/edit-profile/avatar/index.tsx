import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import UploadWrapper from "@/components/UploadWrapper/UploadWrapper";
import { Check, ImagePlus } from "lucide-react";
import { CropperType } from "@/components/Crop/cropper";
import Crop from "@/components/Crop/Crop";
import useFiles from "@/hooks/useFiles";
import { UseFormSetValue } from "react-hook-form";
import { FormInterface } from "@/components/edit-profile";
import { i18nType } from "@/i18n/types";
import { MiniLoading, Portal } from "@/6.shared";

export default function Avatar({
  setValue,
  avatar,
  i18n,
}: {
  setValue: UseFormSetValue<FormInterface>;
  avatar: string;
  i18n: i18nType;
}) {
  const [file, setFile] = React.useState<File | null>(null);
  const [avatarValue, setAvatarValue] = React.useState(avatar);
  const [loading, setLoading] = React.useState(false);
  const cropper = React.useRef<CropperType | null>(null);
  const { uploadBlob } = useFiles();

  const handleDone = () => {
    if (cropper.current) {
      setLoading(true);
      const c = cropper.current!.crop();
      c.toBlob(async (blob) => {
        if (blob) {
          const data = await uploadBlob([blob]);
          if (data.length > 0) {
            setAvatarValue(data[0].url);
            setValue("avatar", data[0].url);
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
  };

  return (
    <div className={styles.avatar}>
      <div className={styles.block}>
        <Image
          priority
          src={avatarValue}
          alt="avatar"
          width={120}
          height={120}
          className={styles.image}
        />
        {loading ? (
          <MiniLoading className={styles.button} />
        ) : (
          <UploadWrapper
            onUpload={(files) => {
              if (files.length > 0) setFile(files[0]);
            }}
            accept="image/*"
            multiple={false}
          >
            <ImagePlus size={16} className={styles.button} />
          </UploadWrapper>
        )}
      </div>
      {file && (
        <Portal
          close={() => {
            setFile(null);
            cropper.current = null;
          }}
          title={i18n.changeProfile.crop}
        >
          <Crop file={file} cropp={cropper} />
          <button className={styles.done} onClick={handleDone}>
            <Check width={20} />
          </button>
        </Portal>
      )}
    </div>
  );
}
