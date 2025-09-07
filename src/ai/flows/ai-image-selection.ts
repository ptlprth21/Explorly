
'use server';

/**
 * @fileOverview This file defines a Genkit flow for AI-powered image selection.
 *
 * It selects the most appealing images for package galleries based on image quality,
 * user ratings, and sentiment analysis of reviews.
 *
 * @module src/ai/flows/ai-image-selection
 *
 * @interface AiImageSelectionInput - The input type for the aiImageSelection function.
 * @interface AiImageSelectionOutput - The output type for the aiImageSelection function.
 * @function aiImageSelection - The main function to select appealing images using AI.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiImageSelectionInputSchema = z.object({
  imageUrls: z.array(z.string().url()).describe('Array of image URLs to evaluate.'),
  packageId: z.string().describe('The ID of the package for which images are being selected.'),
  reviewSentiment: z.string().describe('Sentiment analysis of reviews for the package.'),
  averageRating: z.number().describe('Average rating for the package.'),
});
export type AiImageSelectionInput = z.infer<typeof AiImageSelectionInputSchema>;

const AiImageSelectionOutputSchema = z.object({
  selectedImageUrl: z.string().url().describe('The most appealing image URL selected by AI.'),
  reason: z.string().describe('Reasoning for selecting the image.'),
});
export type AiImageSelectionOutput = z.infer<typeof AiImageSelectionOutputSchema>;

const aiImageSelectionPrompt = ai.definePrompt(
  {
    name: 'aiImageSelectionPrompt',
    input: { schema: AiImageSelectionInputSchema },
    output: { schema: AiImageSelectionOutputSchema },
    prompt: `
      You are an expert travel photo curator. Your task is to select the single most visually appealing and marketable image for a travel package gallery.

      Analyze the following image URLs provided for the package titled "{{packageId}}".

      Image URLs:
      {{#each imageUrls}}
      - {{this}}
      {{/each}}

      Consider the following context:
      - Average Package Rating: {{averageRating}}/5
      - Review Sentiment: "{{reviewSentiment}}"

      Based on standard principles of photography (composition, lighting, color, subject matter) and the provided context, select the one image URL that would be most effective in attracting customers. Provide a brief justification for your choice.
    `,
  },
);

const aiImageSelectionFlow = ai.defineFlow(
  {
    name: 'aiImageSelectionFlow',
    inputSchema: AiImageSelectionInputSchema,
    outputSchema: AiImageSelectionOutputSchema,
  },
  async input => {
    const {output} = await aiImageSelectionPrompt(input);
    return output!;
  }
);


export async function aiImageSelection(input: AiImageSelectionInput): Promise<AiImageSelectionOutput> {
  // Check if there are any images to select from.
  if (!input.imageUrls || input.imageUrls.length === 0) {
    throw new Error('No image URLs provided for AI selection.');
  }

  try {
    return await aiImageSelectionFlow(input);
  } catch (error) {
    console.error("AI image selection failed, using fallback.", error);
    // Fallback: return the first image if the AI flow fails.
    return {
      selectedImageUrl: input.imageUrls[0],
      reason: 'This is a default image. The AI selection feature is currently unavailable.'
    };
  }
}
