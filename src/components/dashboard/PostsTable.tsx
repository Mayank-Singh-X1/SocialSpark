import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Twitter, Instagram, Linkedin, Facebook, Rss } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type Post = {
  id: string;
  content: string;
  status: 'Draft' | 'Scheduled' | 'Published';
  platform: 'Instagram' | 'X' | 'LinkedIn' | 'Facebook' | 'TikTok' | 'Pinterest' | string;
  scheduled_at: string;
  created_at: string;
};

const mockPosts: Post[] = [
    { id: '1', content: 'Excited to announce our new summer collection! ☀️ #summerfashion...', status: 'Published', platform: 'Instagram', scheduled_at: '2023-06-15 10:00 AM', created_at: '2023-06-14' },
    { id: '2', content: 'Our weekly Q&A is happening tomorrow! Get your questions ready...', status: 'Scheduled', platform: 'X', scheduled_at: '2023-06-20 02:00 PM', created_at: '2023-06-19' },
    { id: '3', content: 'A quick thought on the future of AI in marketing...', status: 'Draft', platform: 'LinkedIn', scheduled_at: '-', created_at: '2023-06-18' },
    { id: '4', content: 'Check out this funny meme about Mondays. 😂 #mondaymotivation...', status: 'Published', platform: 'Facebook', scheduled_at: '2023-06-12 09:00 AM', created_at: '2023-06-11' },
];

const statusColors = {
    Draft: 'secondary',
    Scheduled: 'default',
    Published: 'outline'
} as const;

const PlatformLogos = {
    'Instagram': <Instagram className="h-5 w-5 text-pink-500" />,
    'X': <Twitter className="h-5 w-5 text-sky-500" />,
    'LinkedIn': <Linkedin className="h-5 w-5 text-blue-600" />,
    'Facebook': <Facebook className="h-5 w-5 text-blue-800" />,
    'TikTok': <Rss className="h-5 w-5" />, // Placeholder
    'Pinterest': <Rss className="h-5 w-5" />, // Placeholder
}

export default function PostsTable({ status }: { status: 'Draft' | 'Scheduled' | 'Published' }) {
    const posts = mockPosts.filter(p => p.status === status);

    if (posts.length === 0) {
        return <div className="text-center p-8 border-2 border-dashed rounded-lg mt-4">No {status.toLowerCase()} posts found.</div>
    }

  return (
    <div className="border rounded-lg mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Platform</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="text-center">
                 <div className="flex items-center gap-2">
                    {PlatformLogos[post.platform as keyof typeof PlatformLogos] || <Rss className="h-5 w-5" />}
                    <span className="font-medium">{post.platform}</span>
                </div>
              </TableCell>
              <TableCell className="max-w-xs truncate">{post.content}</TableCell>
              <TableCell>
                <Badge variant={statusColors[post.status]}>{post.status}</Badge>
              </TableCell>
              <TableCell>{post.status === 'Scheduled' ? post.scheduled_at : post.created_at}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
