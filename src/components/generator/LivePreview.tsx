'use client';

import ResultCard from './ResultCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { GenerateSocialPostOutput, GenerateSocialPostInput } from '@/ai/flows/generate-social-post';
import { Bot } from 'lucide-react';

type LivePreviewProps = {
  results: GenerateSocialPostOutput;
  isLoading: boolean;
  formValues: GenerateSocialPostInput | null;
  setResults: (results: GenerateSocialPostOutput) => void;
};

export default function LivePreview({ results, isLoading, formValues, setResults }: LivePreviewProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: formValues?.count || 4 }).map((_, i) => (
           <Skeleton key={i} className="h-48 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-96">
        <Bot className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-muted-foreground">Your generated posts will appear here</h3>
        <p className="text-muted-foreground mt-2">Fill out the form to start generating content.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((post, index) => (
        <ResultCard key={index} post={post} formValues={formValues} setResults={setResults} allPosts={results} index={index}/>
      ))}
    </div>
  );
}
