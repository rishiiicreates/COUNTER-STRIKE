import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Weapon model for Counter-Strike weapons
export const weapons = pgTable("weapons", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // rifle, pistol, sniper, etc.
  price: integer("price").notNull(),
  description: text("description"),
  damage: integer("damage"),
  fireRate: integer("fire_rate"),
  accuracy: integer("accuracy"),
  imageUrl: text("image_url"),
});

// Maps model for Counter-Strike maps
export const maps = pgTable("maps", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  sites: text("sites").array(), // A, B, Mid, etc.
  ctSided: boolean("ct_sided"),
  tSided: boolean("t_sided"),
});

// News model for updates and articles
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  summary: text("summary"),
  imageUrl: text("image_url"),
  category: text("category"), // update, tournament, new content
  publishedAt: timestamp("published_at").defaultNow(),
});

// Zod schemas for data validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  avatarUrl: true,
});

export const insertWeaponSchema = createInsertSchema(weapons);
export const insertMapSchema = createInsertSchema(maps);
export const insertNewsSchema = createInsertSchema(news);

// Types for TypeScript
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertWeapon = z.infer<typeof insertWeaponSchema>;
export type Weapon = typeof weapons.$inferSelect;

export type InsertMap = z.infer<typeof insertMapSchema>;
export type Map = typeof maps.$inferSelect;

export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;
