import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const store = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Пользователь не найден");
    const user = await ctx.db
      .query("user")
      .withIndex("token", (q) => q.eq("token", identity.tokenIdentifier))
      .unique();
    if (user !== null) return user._id;

    return null;
  },
});

export const checkUsername = mutation({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("user")
      .withIndex("username", (q) => q.eq("username", args.username))
      .unique();
    return !!user;
  },
});
