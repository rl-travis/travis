import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const add = mutation({
  args: { image_id: v.id("file"), user_id: v.id("user") },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args.image_id);
    if (!file) throw new ConvexError("Файл не найден");
    await ctx.db.patch(args.user_id, {
      url: file.url,
    });
    return await ctx.db.insert("user_avatar", {
      image_url: file.url,
      user_id: args.user_id,
    });
  },
});
