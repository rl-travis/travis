import { mutation } from "./_generated/server";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Пользователь не найден");
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("token", identity.tokenIdentifier))
      .unique();
    if (user !== null) return user._id;

    return await ctx.db.insert("users", {
      name: identity.name!,
      token: identity.tokenIdentifier,
      email: identity.email!,
      about: "",
      username: "",
      locales: 0,
    });
  },
});
