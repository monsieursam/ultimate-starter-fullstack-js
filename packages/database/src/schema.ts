import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";
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
	isActive: text("is_active").default("false"),
	expiresAt: date("expires_at"),
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
