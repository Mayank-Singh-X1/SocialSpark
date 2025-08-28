'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateSocialPost } from '@/ai/flows/generate-social-post';
import type { GenerateSocialPostOutput, GenerateSocialPostInput } from '@/ai/flows/generate-social-post';
import { Sparkles } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Textarea } from '../ui/textarea';
import { Slider } from '../ui/slider';

const formSchema = z.object({
  platform: z.enum(['instagram', 'x', 'linkedin', 'facebook', 'tiktok', 'pinterest']),
  postType: z.enum(['promo', 'announcement', 'quote', 'story', 'meme', 'question']),
  tone: z.enum(['friendly', 'professional', 'funny', 'inspirational', 'persuasive']),
  keywords: z.string().min(3, { message: 'Please provide some keywords.' }),
  length: z.enum(['short', 'medium', 'long']),
  count: z.number().min(1).max(8).default(4),
});

type GeneratorFormProps = {
  setResults: (results: GenerateSocialPostOutput) => void;
  setIsLoading: (isLoading: boolean) => void;
  setFormValues: (values: GenerateSocialPostInput) => void;
};

export default function GeneratorForm({ setResults, setIsLoading, setFormValues }: GeneratorFormProps) {
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: 'instagram',
      postType: 'promo',
      tone: 'friendly',
      keywords: '',
      length: 'medium',
      count: 4,
    },
  });

  useEffect(() => {
    const platform = searchParams.get('platform');
    const postType = searchParams.get('postType');
    const tone = searchParams.get('tone');
    const keywords = searchParams.get('keywords');
    if (platform) form.setValue('platform', platform as any);
    if (postType) form.setValue('postType', postType as any);
    if (tone) form.setValue('tone', tone as any);
    if (keywords) form.setValue('keywords', keywords);
  }, [searchParams, form]);
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResults([]);
    setFormValues(values);
    try {
      const postResults = await generateSocialPost(values);
      setResults(postResults);
      toast({
        title: 'Success!',
        description: `Generated ${postResults.length} new posts.`,
      });
    } catch (error) {
      console.error('Failed to generate posts:', error);
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with our AI generator. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Content Details</CardTitle>
        <CardDescription>Describe the post you want to create.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a platform" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="x">X (Twitter)</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="pinterest">Pinterest</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select post type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="promo">Promo</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="quote">Quote</SelectItem>
                      <SelectItem value="story">Story</SelectItem>
                      <SelectItem value="meme">Meme</SelectItem>
                      <SelectItem value="question">Question</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tone of Voice</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a tone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="funny">Funny</SelectItem>
                      <SelectItem value="inspirational">Inspirational</SelectItem>
                      <SelectItem value="persuasive">Persuasive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Length</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select post length" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="short">Short</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="long">Long</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords / Topic</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., new product launch, summer sale, AI technology" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Posts: {field.value}</FormLabel>
                  <FormControl>
                    <Slider 
                      min={1} 
                      max={8} 
                      step={1} 
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Generating...' : 'Generate Posts'}
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
