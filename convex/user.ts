import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const store = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("user")
      .withIndex("email", (q) => q.eq("email", args.email))
      .unique();
    if (user !== null) return user;
    return null;
  },
});

export const create = mutation({
  args: {
    email: v.string(),
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
    return await ctx.db.insert("user", {
      username: args.username,
      email: args.email,
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
