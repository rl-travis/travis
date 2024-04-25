import { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

export const send = mutation({
  args: {
    user_id: v.id("user"),
    chat_id: v.union(v.id("dialog"), v.id("group"), v.id("channel"), v.id("saved")),
    value: v.string(),
  },
  handler: async (ctx, args) => {
    const message_id = await ctx.db.insert("message", {
      chat_id: args.chat_id,
      value: args.value,
      edited: false,
      user_id: args.user_id,
      forward: false,
    });
    await ctx.db.patch(args.chat_id, {
      last_message_id: message_id,
    });
    return message_id;
  },
});

export const getAll = query({
  args: {
    chat_id: v.union(v.id("dialog"), v.id("group"), v.id("channel"), v.id("saved")),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const users = new Map<Id<"user">, Doc<"user"> | null>();
    const messages = await ctx.db
      .query("message")
      .filter((q) => q.eq(q.field("chat_id"), args.chat_id))
      .order("desc")
      .paginate(args.paginationOpts);

    return {
      ...messages,
      page: messages.page.map(async (message) => {
        let user;
        if (users.has(message.user_id)) user = users.get(message.user_id);
        else {
          user = await ctx.db.get(message.user_id);
          users.set(message.user_id, user);
        }

        if (message.reply_id) {
          const repliedMessage = await ctx.db.get(message.reply_id);
          if (!repliedMessage) {
            return {
              ...message,
              user,
            };
          }
          const repliedUser = await ctx.db.get(repliedMessage.user_id);
          return {
            ...message,
            user,
            reply: {
              message: repliedMessage,
              user: repliedUser,
            },
          };
        }
        return { ...message, user };
      }),
    };
  },
});
