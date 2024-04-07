import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export function useMessage() {
  const send = useMutation(api.message.send);

  return { send };
}

export function useMessageList(
  chat_id: Id<"group"> | Id<"channel"> | Id<"dialog"> | Id<"saved">,
) {
  const messages = useQuery(api.message.getAll, {
    chat_id,
  });

  return { messages };
}
