import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const send = mutation({
  args: {
    user_id: v.id("user"),
    chat_id: v.union(v.id("dialog"), v.id("group"), v.id("channel"), v.id("saved")),
    value: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("message", {
      chat_id: args.chat_id,
      value: args.value,
      edited: false,
      user_id: args.user_id,
      forward: false,
    });
  },
});

export const getAll = query({
  args: {
    user_id: v.id("user"),
    chat_id: v.union(v.id("dialog"), v.id("group"), v.id("channel"), v.id("saved")),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const user = ctx.db.get(args.user_id);
    const messages = await ctx.db
      .query("message")
      .filter((q) => q.eq(q.field("chat_id"), args.chat_id))
      .order("desc")
      .paginate(args.paginationOpts);
    return {
      ...messages,
      page: messages.page.map(async (message) => {
        if (message.reply_id) {
          const repliedMessage = await ctx.db.get(message.reply_id);
          if (!repliedMessage) throw new ConvexError("Такое сообщение не найдено");
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
