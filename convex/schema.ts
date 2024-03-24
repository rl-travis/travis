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
    avatar_url: v.string(),
  })
    .index("email", ["email"])
    .index("username", ["username"]),
  user_avatar: defineTable({
    image_url: v.string(),
    user_id: v.id("user"),
  }).index("user_id", ["user_id"]),
  user_chat: defineTable({
    user_id: v.id("user"),
    chat_id: v.union(v.id("dialog"), v.id("group"), v.id("channel"), v.id("saved")),
    unread: v.number(),
    type: v.union(
      v.literal("dialog"),
      v.literal("channel"),
      v.literal("group"),
      v.literal("saved"),
    ),
    pinned: v.boolean(),
  })
    .index("user_id", ["user_id"])
    .index("chat_id", ["chat_id"]),
  dialog: defineTable({
    first_user_id: v.id("user"),
    second_user_id: v.id("user"),
    last_message_id: v.optional(v.id("message")),
  }),
  message: defineTable({
    user_id: v.id("user"),
    chat_id: v.union(v.id("dialog"), v.id("group"), v.id("channel"), v.id("saved")),
    edited: v.boolean(),
    reply: v.optional(v.id("message")),
    forward: v.boolean(),
    value: v.string(),
  }),
  pinned_message: defineTable({
    chat_id: v.id("dialog"),
    message_id: v.id("message"),
  }).index("chat_id", ["chat_id"]),

  group: defineTable({
    avatar_url: v.string(),
    about: v.string(),
    name: v.string(),
    last_message_id: v.optional(v.id("message")),
  }),
  channel: defineTable({
    avatar_url: v.string(),
    about: v.string(),
    name: v.string(),
    last_message_id: v.optional(v.id("message")),
  }),
  admin: defineTable({
    owner: v.boolean(),
    user_id: v.id("user"),
    chat_id: v.union(v.id("group"), v.id("channel")),
  }).index("chat_id", ["chat_id"]),

  saved: defineTable({
    avatar_url: v.string(),
    name: v.string(),
    last_message_id: v.optional(v.id("message")),
  }),
});
