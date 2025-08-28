import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostsTable from '@/components/dashboard/PostsTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-4xl font-bold font-headline tracking-tight">
            My Posts
            </h1>
            <p className="text-muted-foreground">Manage your content and view performance.</p>
        </div>
        <Link href="/generator">
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Post
            </Button>
        </Link>
      </div>
      <Tabs defaultValue="drafts">
        <TabsList>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="drafts">
          <PostsTable status="Draft" />
        </TabsContent>
        <TabsContent value="scheduled">
          <PostsTable status="Scheduled" />
        </TabsContent>
        <TabsContent value="published">
          <PostsTable status="Published" />
        </TabsContent>
        <TabsContent value="analytics">
            <div className="flex items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-96">
                <p className="text-muted-foreground">Analytics dashboard coming soon!</p>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
