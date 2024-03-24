import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { DEFAULT_AVATAR_URL } from "../src/constants/constants";

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
    const created_user = await ctx.db.insert("user", {
      username: args.username,
      email: args.email,
      locales: args.locales,
      about: args.about,
      name: args.name,
      url: DEFAULT_AVATAR_URL, //вынес в константу
    });

    const saved = await ctx.db.insert("saved", {
      name: "saved",
      avatar_url: DEFAULT_AVATAR_URL, //вынес в константу
    });

    await ctx.db.insert("user_chat", {
      unread: 0,
      pinned: false,
      user_id: created_user,
      chat_id: saved,
      type: "saved",
    });

    return created_user;
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
