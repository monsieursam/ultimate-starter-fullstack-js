import { openai } from "@ai-sdk/openai";
import { os } from "@orpc/server";
import { experimental_generateImage as generateImage } from "ai";
import { z } from "zod";
import { revenueCatMiddleware } from "../middleware";

const ImageGenrator = z.object({
	prompt: z.string(),
	size: z.number().optional(),
	n: z.number().optional(),
});

export const createImage = os
	.use(revenueCatMiddleware)
	.input(ImageGenrator)
	.handler(async ({ input }) => {
		const { prompt, size, n } = input;
		const model = openai.image("gpt-image-1");

		const { images } = await generateImage({
			model,
			prompt,
			n,
		});

		return images;
	});
