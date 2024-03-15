import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  file: defineTable({
    storage: v.id("_storage"),
    url: v.string(),
    size: v.number(),
    name: v.string(),
  }),

  user: defineTable({
    email: v.string(),
    username: v.string(),
    name: v.string(),
    about: v.string(),
    locales: v.number(),
  })
    .index("email", ["email"])
    .index("username", ["username"]),
  user_avatar: defineTable({
    image_url: v.string(),
    general: v.boolean(),
    public: v.boolean(),
    image_id: v.id("file"),
    user_id: v.id("user"),
  }).index("user_id", ["user_id"]),
});
