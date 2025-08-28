'use server';

/**
 * @fileOverview Flow for generating variations of a social media post.
 *
 * - generateVariations - A function that generates variations of a social media post.
 * - GenerateVariationsInput - The input type for the generateVariations function.
 * - GenerateVariationsOutput - The return type for the generateVariations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVariationsInputSchema = z.object({
  platform: z.enum(['instagram', 'x', 'linkedin', 'facebook', 'tiktok', 'pinterest']).describe('The social media platform for the post.'),
  postType: z.enum(['promo', 'announcement', 'quote', 'story', 'meme', 'question']).describe('The type of social media post.'),
  tone: z.enum(['friendly', 'professional', 'funny', 'inspirational', 'persuasive']).describe('The tone of the social media post.'),
  keywords: z.string().describe('Keywords related to the social media post.'),
  length: z.enum(['short', 'medium', 'long']).describe('The desired length of the social media post.'),
  originalPost: z.string().describe('The original social media post to generate variations from.'),
});
export type GenerateVariationsInput = z.infer<typeof GenerateVariationsInputSchema>;

const GenerateVariationsOutputSchema = z.object({
  variations: z.array(z.string()).describe('An array of social media post variations.'),
});
export type GenerateVariationsOutput = z.infer<typeof GenerateVariationsOutputSchema>;

export async function generateVariations(input: GenerateVariationsInput): Promise<GenerateVariationsOutput> {
  return generateVariationsFlow(input);
}

const generateVariationsPrompt = ai.definePrompt({
  name: 'generateVariationsPrompt',
  input: {schema: GenerateVariationsInputSchema},
  output: {schema: GenerateVariationsOutputSchema},
  prompt: `You are an expert social media content creator.

You are given an original social media post, and you will generate variations of that post.

Original Post: {{{originalPost}}}
Platform: {{{platform}}}
Post Type: {{{postType}}}
Tone: {{{tone}}}
Keywords: {{{keywords}}}
Length: {{{length}}}

Generate 3 variations of the original post, keeping the same tone and keywords.

Variations:`, // Ensure the prompt ends with 'Variations:' to guide the model output
});

const generateVariationsFlow = ai.defineFlow(
  {
    name: 'generateVariationsFlow',
    inputSchema: GenerateVariationsInputSchema,
    outputSchema: GenerateVariationsOutputSchema,
  },
  async input => {
    const {output} = await generateVariationsPrompt(input);
    // Basic error handling in case the prompt unexpectedly returns null or undefined.
    if (!output || !output.variations) {
      throw new Error('Failed to generate variations.');
    }
    return {
      variations: output.variations,
    };
  }
);
