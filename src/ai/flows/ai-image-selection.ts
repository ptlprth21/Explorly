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

export async function aiImageSelection(input: AiImageSelectionInput): Promise<AiImageSelectionOutput> {
  return aiImageSelectionFlow(input);
}

const aiImageSelectionPrompt = ai.definePrompt({
  name: 'aiImageSelectionPrompt',
  input: {schema: AiImageSelectionInputSchema},
  output: {schema: AiImageSelectionOutputSchema},
  prompt: `You are an AI image selection expert for a travel booking platform.
  Given a list of image URLs for a travel package, user review sentiments, the average rating, and the package ID,
  select the most visually appealing image that is likely to attract potential customers.
  Prioritize images that reflect positive sentiment from reviews and high ratings, and also consider image quality and relevance to the package.

  Image URLs: {{imageUrls}}
  Package ID: {{packageId}}
  Review Sentiment: {{reviewSentiment}}
  Average Rating: {{averageRating}}

  Based on these factors, choose the best image URL and explain your reasoning. Be concise.
  Return the selected image URL and your reason for selecting it. Keep the reason to under 30 words.
  {
    "selectedImageUrl": "<selected_image_url>",
    "reason": "<reason_for_selection>"
  }`,
});

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
