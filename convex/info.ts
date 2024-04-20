import { query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { Doc } from "./_generated/dataModel";

export const get = query({
  args: {
    doc: v.union(v.id("user"), v.id("saved"), v.id("group"), v.id("channel")),
    type: v.union(
      v.literal("user"),
      v.literal("saved"),
      v.literal("group"),
      v.literal("channel"),
    ),
  },
  handler: async (
    ctx,
    args,
  ): Promise<{
    username?: null | string;
    name: null | string;
    avatar_urls: string[];
    about: null | string;
  }> => {
    let document = await ctx.db.get(args.doc);
    if (!document) throw new ConvexError("Документ не найден");
    if (args.type !== "user") {
      if (Object.keys(document).includes("about")) {
        document = document as Doc<"group"> | Doc<"channel"> | Doc<"saved">;
        return {
          name: document.name,
          avatar_urls: [document.avatar_url],
          about: document.about,
        };
      } else {
        return {
          name: document.name,
          avatar_urls: [document.avatar_url],
          about: null,
        };
      }
    } else {
      document = document as Doc<"user">;
      const avatars = await ctx.db
        .query("user_avatar")
        .filter((q) => q.eq(q.field("user_id"), args.doc))
        .collect();
      const avatars_url = avatars.map((avatar) => avatar.url);
      return {
        username: document.username,
        name: document.name,
        avatar_urls: avatars_url,
        about: document.about,
      };
    }
  },
});
