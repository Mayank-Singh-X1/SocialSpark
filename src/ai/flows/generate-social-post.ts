'use server';

/**
 * @fileOverview An AI agent for generating social media posts.
 *
 * - generateSocialPost - A function that generates social media posts based on a description.
 * - GenerateSocialPostInput - The input type for the generateSocialPost function.
 * - GenerateSocialPostOutput - The return type for the generateSocialPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSocialPostInputSchema = z.object({
  platform: z.enum(['instagram', 'x', 'linkedin', 'facebook', 'tiktok', 'pinterest']).describe('The social media platform for the post.'),
  postType: z.enum(['promo', 'announcement', 'quote', 'story', 'meme', 'question']).describe('The type of social media post.'),
  tone: z.enum(['friendly', 'professional', 'funny', 'inspirational', 'persuasive']).describe('The tone of the social media post.'),
  keywords: z.string().describe('Keywords to guide the post generation.'),
  length: z.enum(['short', 'medium', 'long']).describe('The desired length of the social media post.'),
  count: z.number().default(4).describe('The number of posts to generate.'),
});
export type GenerateSocialPostInput = z.infer<typeof GenerateSocialPostInputSchema>;

const GeneratedPostSchema = z.object({
  caption: z.string().describe('The generated social media post caption.'),
  hashtags: z.string().describe('Relevant hashtags for the post.'),
  emojis: z.string().describe('Relevant emojis for the post.'),
});
export type GeneratedPost = z.infer<typeof GeneratedPostSchema>;

const GenerateSocialPostOutputSchema = z.array(GeneratedPostSchema);
export type GenerateSocialPostOutput = z.infer<typeof GenerateSocialPostOutputSchema>;

export async function generateSocialPost(input: GenerateSocialPostInput): Promise<GenerateSocialPostOutput> {
  return generateSocialPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSocialPostPrompt',
  input: {schema: GenerateSocialPostInputSchema},
  output: {schema: GenerateSocialPostOutputSchema},
  prompt: `You are a social media expert. Generate engaging social media posts based on the following criteria:

Platform: {{platform}}
Post Type: {{postType}}
Tone: {{tone}}
Keywords: {{keywords}}
Length: {{length}}

Generate {{count}} variations. Each post should include a caption, relevant hashtags, and emojis. Focus on attracting attention and encouraging interaction.

Format each post as a JSON object containing the fields 'caption', 'hashtags', and 'emojis'. Return a JSON array of these objects.`, 
});

const generateSocialPostFlow = ai.defineFlow(
  {
    name: 'generateSocialPostFlow',
    inputSchema: GenerateSocialPostInputSchema,
    outputSchema: GenerateSocialPostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
