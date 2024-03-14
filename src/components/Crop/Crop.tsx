import React, { useRef } from "react";
import ReadBlobAsDataURL from "@/utils/ReadBlobAsDataURL";
import cropper from "@/components/Crop/cropper";
import "./Crop.scss";

export default function Crop({
  file,
  isDone,
  done,
}: {
  file: File;
  isDone: boolean;
  done: (c: HTMLCanvasElement) => void;
}) {
  const originalImage = useRef<HTMLImageElement>(null);
  const cropp = useRef<{
    crop: () => HTMLCanvasElement;
    removeHandlers: () => void;
  } | null>(null);
  React.useEffect(() => {
    if (!cropp.current) {
      ReadBlobAsDataURL(file).then((res) => {
        originalImage.current!.src = res;
        originalImage.current!.onload = () => {
          cropp.current = cropper(originalImage.current!);
        };
      });
    }
  }, []);

  React.useEffect(() => {
    if (cropp.current && isDone) {
      const c = cropp.current!.crop();
      cropp.current!.removeHandlers();
      done(c);
    }
  }, [isDone]);

  return (
    <>
      <div className="crop-avatar__wrapper">
        <img
          src=""
          ref={originalImage}
          className="crop-avatar__original-image"
          draggable={false}
        />
      </div>
    </>
  );
}
