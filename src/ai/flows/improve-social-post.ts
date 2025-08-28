'use server';

/**
 * @fileOverview An AI agent that improves social media posts by adding emojis, hashtags, and calls to action.
 *
 * - improveSocialPost - A function that improves a social media post.
 * - ImproveSocialPostInput - The input type for the improveSocialPost function.
 * - ImproveSocialPostOutput - The return type for the improveSocialPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveSocialPostInputSchema = z.object({
  platform: z.enum(['instagram', 'x', 'linkedin', 'facebook', 'tiktok', 'pinterest']).describe('The social media platform for the post.'),
  postType: z.enum(['promo', 'announcement', 'quote', 'story', 'meme', 'question']).describe('The type of social media post.'),
  tone: z.enum(['friendly', 'professional', 'funny', 'inspirational', 'persuasive']).describe('The tone of the social media post.'),
  keywords: z.string().describe('Keywords related to the social media post.'),
  length: z.enum(['short', 'medium', 'long']).describe('The desired length of the social media post.'),
  post: z.string().describe('The social media post to improve.'),
});

export type ImproveSocialPostInput = z.infer<typeof ImproveSocialPostInputSchema>;

const ImproveSocialPostOutputSchema = z.object({
  improvedPost: z.string().describe('The improved social media post with emojis, hashtags, and calls to action.'),
});

export type ImproveSocialPostOutput = z.infer<typeof ImproveSocialPostOutputSchema>;

export async function improveSocialPost(input: ImproveSocialPostInput): Promise<ImproveSocialPostOutput> {
  return improveSocialPostFlow(input);
}

const improveSocialPostPrompt = ai.definePrompt({
  name: 'improveSocialPostPrompt',
  input: {schema: ImproveSocialPostInputSchema},
  output: {schema: ImproveSocialPostOutputSchema},
  prompt: `You are a social media expert. You will improve the given social media post by adding relevant emojis, hashtags, and calls to action.

  Here are some details about the post:
  Platform: {{platform}}
  Post Type: {{postType}}
  Tone: {{tone}}
  Keywords: {{keywords}}
  Length: {{length}}

  Here is the post to improve:
  {{post}}
  `,
});

const improveSocialPostFlow = ai.defineFlow(
  {
    name: 'improveSocialPostFlow',
    inputSchema: ImproveSocialPostInputSchema,
    outputSchema: ImproveSocialPostOutputSchema,
  },
  async input => {
    const {output} = await improveSocialPostPrompt(input);
    return output!;
  }
);
