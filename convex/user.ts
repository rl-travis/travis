import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const store = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const user = await ctx.db
      .query("user")
      .withIndex("token", (q) => q.eq("token", identity.tokenIdentifier))
      .unique();
    if (user !== null) return user;
    return null;
  },
});

export const create = mutation({
  args: {
    username: v.string(),
    about: v.string(),
    name: v.string(),
    locales: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("user")
      .withIndex("username", (q) => q.eq("username", args.username))
      .unique();
    if (!!user) throw new Error("такой username уже занят");
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("ошибка авторизации");
    return await ctx.db.insert("user", {
      username: args.username,
      email: identity.email!,
      token: identity.tokenIdentifier,
      locales: args.locales,
      about: args.about,
      name: args.name,
    });
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
