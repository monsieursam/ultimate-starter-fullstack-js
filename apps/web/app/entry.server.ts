import type { User } from "better-auth";
import type { unstable_InitialContext } from "react-router";
import { unstable_createContext } from "react-router";

const userContext = unstable_createContext<User>();

export function getLoadContext(req, res): unstable_InitialContext {
	const map = new Map();
	map.set(userContext, "database");
	return map;
}
