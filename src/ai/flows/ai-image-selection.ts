
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
  // Check if there are any images to select from.
  if (!input.imageUrls || input.imageUrls.length === 0) {
    throw new Error('No image URLs provided for AI selection.');
  }

  // Fallback: return the first image.
  return {
    selectedImageUrl: input.imageUrls[0],
    reason: 'This is a default image. The AI selection feature is currently unavailable.'
  };
}
