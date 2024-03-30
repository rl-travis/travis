import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function useDialog() {
  const create = useMutation(api.dialog.create);

  return { create };
}
