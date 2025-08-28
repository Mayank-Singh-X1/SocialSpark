'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostsTable from '@/components/dashboard/PostsTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const FADE_IN_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } },
  };
  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className="container mx-auto px-4 py-8"
    >
      <motion.div
        variants={FADE_IN_VARIANTS}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold font-headline tracking-tight">
            My Posts
          </h1>
          <p className="text-muted-foreground">
            Manage your content and view performance.
          </p>
        </div>
        <Link href="/generator">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </motion.div>
      <motion.div variants={FADE_IN_VARIANTS}>
        <Tabs defaultValue="drafts">
          <TabsList className="grid w-full grid-cols-4">
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
            <AnalyticsChart />
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
