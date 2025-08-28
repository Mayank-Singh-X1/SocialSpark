import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

type Template = {
  id: string;
  title: string;
  description: string;
  image: string;
  'data-ai-hint': string;
  form_data: {
    platform: string;
    postType: string;
    tone: string;
    keywords: string;
  };
};

export default async function TemplatesPage() {
  const file = await fs.readFile(path.join(process.cwd(), 'src/data/templates.json'), 'utf8');
  const templates: Template[] = JSON.parse(file);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight mb-2">
          Template Marketplace
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Kickstart your content creation with our professionally designed post templates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => {
          const params = new URLSearchParams(template.form_data);
          return (
            <Card key={template.id} className="flex flex-col">
              <CardHeader>
                <div className="aspect-[3/2] relative overflow-hidden rounded-t-lg">
                   <Image src={template.image} alt={template.title} fill className="object-cover" data-ai-hint={template['data-ai-hint']} />
                </div>
                <CardTitle className="pt-4">{template.title}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow" />
              <CardFooter className="flex justify-between gap-2">
                <Button variant="outline" className="w-full">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Link href={`/generator?${params.toString()}`} className="w-full">
                  <Button className="w-full">Use Template</Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
