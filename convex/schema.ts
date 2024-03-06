import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  files: defineTable({
    storage: v.id("_storage"),
    url: v.string(),
    size: v.number(),
    name: v.string(),
  }),

  users: defineTable({
    email: v.string(),
    token: v.string(),
    username: v.string(),
    name: v.string(),
    about: v.string(),
    locales: v.number(),
  }).index("by_token", ["token"]),
  user_avatar: defineTable({
    image: v.string(),
    general: v.boolean(),
    public: v.boolean(),
    user_id: v.id("user"),
  }).index("by_user_id", ["user_id"]),
});
