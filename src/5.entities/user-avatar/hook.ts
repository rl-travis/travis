import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function useUserAvatar() {
  const add = useMutation(api.user_avatar.add);

  return { add };
}
