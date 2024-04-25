import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

import { useMutation, usePaginatedQuery } from "convex/react";

export function useMessage() {
  const send = useMutation(api.message.send);

  return { send };
}

export function useMessageList(
  chat_id: Id<"group"> | Id<"channel"> | Id<"dialog"> | Id<"saved">,
) {
  const { results: messages } = usePaginatedQuery(
    api.message.getAll,
    {
      chat_id,
    },
    {
      initialNumItems: 52,
    },
  );

  return { messages };
}
