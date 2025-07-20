import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { accounts, sessions, users, verifications } from "./auth-schema";

export { accounts, sessions, users, verifications } from "./auth-schema";

export const planets = pgTable("planets", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name"),
});

export const schema = {
	accounts,
	sessions,
	users,
	verifications,

	planets,
};
