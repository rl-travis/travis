"use client";

import UploadWrapper from "@/components/Upload/UploadWrapper";

export default function Home() {
  return (
    <>
      <UploadWrapper
        onLoad={(s) => console.log(s)}
        loading={<div>идет загрузка</div>}
        multiple
      >
        <div>123</div>
      </UploadWrapper>
    </>
  );
}
