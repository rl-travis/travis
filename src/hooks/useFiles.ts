import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc, Id } from "../../convex/_generated/dataModel";
import ky from "ky";

export default function useFiles() {
  const generateUrl = useMutation(api.file.generateUploadUrl);
  const create = useMutation(api.file.createFile);
  const upload = async (files: File[]) => {
    const res: Doc<"file">[] = [];
    const uploadUrl = await generateUrl();
    for (const file of files) {
      const result: { storageId: Id<"_storage"> } = await ky
        .post(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type || "application/octet-stream" },
          body: file,
        })
        .json();
      const data = await create({
        storageId: result.storageId,
        name: file.name,
        size: file.size,
      });
      if (data) res.push(data);
    }
    return res;
  };

  return { upload };
}
