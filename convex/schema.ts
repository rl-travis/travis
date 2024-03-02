import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    token: v.string(),
    username: v.string(),
    name: v.string(),
    about: v.string(),
    locales: v.number(),
  }).index("by_token", ["token"]),
});