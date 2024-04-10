import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import {
  ProfileInfoParamsType,
  ProfileInfoReturnType,
} from "@/5.entities/profile/lib/types";

export function useProfileInfo({
  doc,
  type,
}: ProfileInfoParamsType): ProfileInfoReturnType | undefined {
  return useQuery(api.info.get, {
    doc,
    type,
  });
}
