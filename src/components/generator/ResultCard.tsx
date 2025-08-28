'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Save, Edit, Sparkles, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { GeneratedPost, GenerateSocialPostInput, GenerateSocialPostOutput } from '@/ai/flows/generate-social-post';
import { generateVariations } from '@/ai/flows/generate-variations';
import { useState } from 'react';
import { Badge } from '../ui/badge';
import PostEditorModal from '../editor/PostEditorModal';

type ResultCardProps = {
  post: GeneratedPost;
  formValues: GenerateSocialPostInput | null;
  setResults: (cb: (prev: GenerateSocialPostOutput) => GenerateSocialPostOutput) => void;
  allPosts: GenerateSocialPostOutput;
  index: number;
};

export default function ResultCard({ post, formValues, setResults, allPosts, index }: ResultCardProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(post);

  const handleCopy = () => {
    const postText = `${currentPost.caption}\n\n${currentPost.hashtags}\n\n${currentPost.emojis}`;
    navigator.clipboard.writeText(postText);
    toast({ title: 'Post copied to clipboard!' });
  };

  const handleNewVariation = async () => {
    if (!formValues) {
      toast({ title: 'Error', description: 'Original form data not found.', variant: 'destructive' });
      return;
    }
    setIsGenerating(true);
    try {
      const variationsResult = await generateVariations({
        ...formValues,
        originalPost: currentPost.caption,
      });

      if (variationsResult.variations && variationsResult.variations.length > 0) {
        const newPostContent = variationsResult.variations[0];
        
        // Let's create a new post object. The AI for variations doesn't return hashtags/emojis, so we'll re-use them for now.
        const newPost: GeneratedPost = {
            caption: newPostContent,
            hashtags: currentPost.hashtags, // Re-use or improve later
            emojis: currentPost.emojis, // Re-use or improve later
        };

        setResults(prev => {
            const newResults = [...prev];
            newResults[index] = newPost;
            return newResults;
        });
        setCurrentPost(newPost);

        toast({ title: 'New variation generated!' });
      } else {
        toast({ title: 'Could not generate a variation.', variant: 'destructive' });
      }

    } catch (error) {
      console.error(error);
      toast({ title: 'Error generating variation', variant: 'destructive' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = (updatedPost: GeneratedPost) => {
    setCurrentPost(updatedPost);
    setResults(prev => {
        const newResults = [...prev];
        newResults[index] = updatedPost;
        return newResults;
    });
    toast({ title: 'Post updated successfully!' });
  };

  const hashtags = currentPost.hashtags.split(' ').filter(h => h.startsWith('#'));

  return (
    <>
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <p className="whitespace-pre-wrap text-foreground/90">{currentPost.caption}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {hashtags.map((tag, i) => (
              <Badge key={i} variant="secondary">{tag}</Badge>
            ))}
          </div>
          <p className="mt-4 text-xl">{currentPost.emojis}</p>
        </CardContent>
        <CardFooter className="bg-muted/50 p-3 flex justify-end gap-2">
          <Button variant="ghost" size="icon" onClick={handleCopy} aria-label="Copy post">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => toast({ title: "Save feature coming soon!"})} aria-label="Save post">
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsEditorOpen(true)} aria-label="Edit post">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNewVariation} disabled={isGenerating} aria-label="Generate new variation">
            {isGenerating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-accent" />}
          </Button>
        </CardFooter>
      </Card>
      <PostEditorModal
        isOpen={isEditorOpen}
        setIsOpen={setIsEditorOpen}
        post={currentPost}
        onSave={handleSave}
        formValues={formValues}
      />
    </>
  );
}
