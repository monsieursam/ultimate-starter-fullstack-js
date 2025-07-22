import { stripe } from "@better-auth/stripe";
import { db, schema } from "@repo/database"; // Adjust the import path as necessary
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import Stripe from "stripe";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2025-06-30.basil",
});

export const auth: ReturnType<typeof betterAuth> = betterAuth({
	plugins: [
		stripe({
			stripeClient,
			stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
			createCustomerOnSignUp: true,
			subscription: {
				enabled: true,
				plans: [
					{
						name: "basic", // the name of the plan, it'll be automatically lower cased when stored in the database
						priceId: "price_1234567890", // the price ID from stripe
						annualDiscountPriceId: "price_1234567890", // (optional) the price ID for annual billing with a discount
						limits: {
							projects: 5,
							storage: 10,
						},
					},
					{
						name: "pro",
						priceId: "price_0987654321",
						limits: {
							projects: 20,
							storage: 50,
						},
						freeTrial: {
							days: 14,
						},
					},
				],
			},
		}),
	],
	database: drizzleAdapter(db, {
		provider: "pg", // or "pg" or "mysql"
		usePlural: true, // Use plural table names
		schema,
	}),
	emailAndPassword: {
		enabled: true,
	},
	user: {
		additionalFields: {
			revenueCatCustomerId: {
				type: "string",
				required: false,
			},
		},
	},
});
