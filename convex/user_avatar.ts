import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const add = mutation({
  args: { image_id: v.id("file"), user_id: v.id("user") },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args.image_id);
    return await ctx.db.insert("user_avatar", {
      image_url: file!.url,
      image_id: args.image_id,
      user_id: args.user_id,
      general: true,
      public: false,
    });
  },
});
