import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export function useMessage() {
  const send = useMutation(api.message.send);

  return { send };
}

export function useMessageList(
  user_id: Id<"user">,
  chat_id: Id<"group"> | Id<"channel"> | Id<"dialog"> | Id<"saved">,
) {
  const messages = useQuery(api.message.getAll, {
    user_id,
    chat_id,
    //тут тоже надо будет поработать
    paginationOpts: {},
  });

  return { messages };
}
