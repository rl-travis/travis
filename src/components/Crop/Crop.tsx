import React from "react";
import ReadBlobAsDataURL from "@/utils/ReadBlobAsDataURL";
import cropper, { CropperType } from "@/components/Crop/cropper";
import "./Crop.scss";
export default function Crop({
  file,
  cropp,
}: {
  file: File;
  cropp: React.MutableRefObject<CropperType | null>;
}) {
  const originalImage = React.useRef<HTMLImageElement>(null);
  React.useEffect(() => {
    if (!cropp.current) {
      ReadBlobAsDataURL(file).then((res) => {
        originalImage.current!.src = res;
        originalImage.current!.onload = () => {
          cropp.current = cropper(originalImage.current!);
        };
      });
    }
  }, [file]);

  return (
    <div className="crop-avatar__wrapper">
      <img
        src=""
        ref={originalImage}
        className="crop-avatar__original-image"
        draggable={false}
      />
    </div>
  );
}
