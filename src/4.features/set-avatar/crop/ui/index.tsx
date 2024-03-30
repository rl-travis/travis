import React from "react";
import ReadBlobAsDataURL from "@/4.features/set-avatar/crop/lib/ReadBlobAsDataURL";

import "./index.scss";
import { CropperType } from "@/4.features";
import { cropper } from "@/4.features";
export function Crop({
  file,
  crop, //немного напрягало две p
}: {
  file: File;
  crop: React.MutableRefObject<CropperType | null>;
}) {
  const originalImage = React.useRef<HTMLImageElement>(null);
  React.useEffect(() => {
    if (!crop.current) {
      ReadBlobAsDataURL(file).then((res) => {
        originalImage.current!.src = res;
        originalImage.current!.onload = () => {
          crop.current = cropper(originalImage.current!);
        };
      });
    }
  }, [file]);

  return (
    <div className="crop-avatar__wrapper">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src=""
        ref={originalImage}
        className="crop-avatar__original-image"
        draggable={false}
        alt="crop avatar"
      />
    </div>
  );
}
