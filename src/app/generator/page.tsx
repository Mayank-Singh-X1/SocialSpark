'use client';

import { useState, Suspense } from 'react';
import type { GenerateSocialPostOutput, GenerateSocialPostInput } from '@/ai/flows/generate-social-post';
import GeneratorForm from '@/components/generator/GeneratorForm';
import LivePreview from '@/components/generator/LivePreview';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

function GeneratorFormSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-20 w-full" />
        </div>
        <Skeleton className="h-11 w-full" />
      </CardContent>
    </Card>
  )
}

export default function GeneratorPage() {
  const [results, setResults] = useState<GenerateSocialPostOutput>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState<GenerateSocialPostInput | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
       <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight mb-2">
            Social Post Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fill out the form below and let our AI create the perfect social media posts for you.
          </p>
        </div>
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4">
          <Suspense fallback={<GeneratorFormSkeleton />}>
            <GeneratorForm 
              setResults={setResults} 
              setIsLoading={setIsLoading}
              setFormValues={setFormValues}
            />
          </Suspense>
        </div>
        <div className="lg:col-span-8 lg:sticky top-24">
          <LivePreview results={results} isLoading={isLoading} formValues={formValues} setResults={setResults}/>
        </div>
      </div>
    </div>
  );
}
