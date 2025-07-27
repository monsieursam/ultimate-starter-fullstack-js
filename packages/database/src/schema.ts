import { date, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { accounts, sessions, users, verifications } from "./auth-schema";

export {
	accounts,
	sessions,
	users,
	verifications,
} from "./auth-schema";

export const planets = pgTable("planets", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name"),
});

export const subscriptions = pgTable("subscriptions", {
	id: uuid("id").defaultRandom().primaryKey(),
	revenueCatCustomerId: text("revenue_cat_customer_id")
		.notNull()
		.references(() => users.revenueCatCustomerId, { onDelete: "cascade" }),
	status: text("status").notNull(),
	expiration_at: text("expiration_at").notNull(),
	last_transaction_id: text("last_transaction_id").notNull(),
	product_id: text("product_id").notNull(),
});

export const api_requests = pgTable("api_requests", {
	id: uuid("id").primaryKey(),
	userId: uuid("user_id")
		.notNull()
		.references(() => users.id),
	timestamp: timestamp("timestamp").notNull(),
});

export const schema = {
	accounts,
	sessions,
	users,
	verifications,
	subscriptions,

	planets,
};

export type User = typeof users.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
