import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function useUser() {
  const store = useMutation(api.user.store);
  const create = useMutation(api.user.create);
  const checkUsername = useMutation(api.user.checkUsername);
  const devGetAll = useQuery(api.user.devGetAll);

  return { store, create, checkUsername, devGetAll };
}