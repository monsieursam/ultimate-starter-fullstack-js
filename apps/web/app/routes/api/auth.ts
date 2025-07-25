import { auth } from "@repo/auth";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
	return auth.handler(request);
}

export async function action({ request }: ActionFunctionArgs) {
	return auth.handler(request);
}
