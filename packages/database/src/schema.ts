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

// export const api_requests = pgTable("api_requests", {
// 	id: uuid("id").primaryKey(),
// 	userId: text("user_id")
// 		.notNull()
// 		.references(() => users.id),
// 	timestamp: timestamp("timestamp").notNull(),
// });

export const schema = {
	accounts,
	sessions,
	users,
	verifications,

	planets,
};

export type User = typeof users.$inferSelect;
