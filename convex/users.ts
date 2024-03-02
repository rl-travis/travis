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
    if (user !== null) {
      if (
        user.name !== identity.name ||
        user.email !== identity.email ||
        user.avatar !== identity.pictureUrl
      ) {
        await ctx.db.patch(user._id, {
          name: identity.name,
          email: identity.email,
          avatar: identity.pictureUrl,
        });
      }
      return user._id;
    }
    return await ctx.db.insert("users", {
      name: identity.name!,
      token: identity.tokenIdentifier,
      avatar:
        identity.pictureUrl ||
        "https://www.rlmillerllc.com/wp-content/uploads/2017/07/default-user-image.png",
      email: identity.email!,
      about: "",
      username: "",
      locales: 0
    });
  },
});