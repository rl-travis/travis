import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export function useMessage() {
  const send = useMutation(api.message.send);

  return { send };
}
