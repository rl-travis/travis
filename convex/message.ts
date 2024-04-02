import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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
    chat_id: v.union(v.id("dialog"), v.id("group"), v.id("channel"), v.id("saved")),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("message")
      .filter((q) => q.eq(q.field("chat_id"), args.chat_id))
      .collect();
  },
});
