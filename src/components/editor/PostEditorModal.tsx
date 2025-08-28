'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import type { GeneratedPost, GenerateSocialPostInput } from '@/ai/flows/generate-social-post';
import { improveSocialPost } from '@/ai/flows/improve-social-post';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';

type PostEditorModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  post: GeneratedPost;
  onSave: (post: GeneratedPost) => void;
  formValues: GenerateSocialPostInput | null;
};

export default function PostEditorModal({ isOpen, setIsOpen, post, onSave, formValues }: PostEditorModalProps) {
  const [editedCaption, setEditedCaption] = useState(post.caption);
  const [editedHashtags, setEditedHashtags] = useState(post.hashtags);
  const [editedEmojis, setEditedEmojis] = useState(post.emojis);
  const [isImproving, setIsImproving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setEditedCaption(post.caption);
      setEditedHashtags(post.hashtags);
      setEditedEmojis(post.emojis);
    }
  }, [isOpen, post]);

  const handleSave = () => {
    onSave({
      caption: editedCaption,
      hashtags: editedHashtags,
      emojis: editedEmojis,
    });
    setIsOpen(false);
  };
  
  const handleImprovePost = async () => {
    if(!formValues) {
        toast({title: "Cannot improve post without original context.", variant: "destructive"});
        return;
    }
    setIsImproving(true);
    try {
        const result = await improveSocialPost({
            ...formValues,
            post: editedCaption,
        });
        if(result.improvedPost) {
            // The AI returns one block of text, we'll try to parse it.
            // This is a simple parsing, might need more robust logic.
            const parts = result.improvedPost.split(/\n\s*\n/);
            setEditedCaption(parts[0] || '');
            const hashtagsAndEmojis = (parts[1] || '').split(' ');
            const hashtags = hashtagsAndEmojis.filter(p => p.startsWith('#')).join(' ');
            const emojis = hashtagsAndEmojis.filter(p => !p.startsWith('#')).join(' ');
            
            setEditedHashtags(hashtags);
            setEditedEmojis(emojis);

            toast({ title: "Post improved with AI!" });
        }
    } catch(e) {
        toast({ title: "Failed to improve post.", variant: "destructive" });
    } finally {
        setIsImproving(false);
    }
  }

  const hashtags = editedHashtags.split(' ').filter(h => h.startsWith('#'));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            Refine your post, add emojis, and adjust hashtags before saving.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              value={editedCaption}
              onChange={(e) => setEditedCaption(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hashtags">Hashtags</Label>
            <div className="p-2 border rounded-md min-h-[40px] flex flex-wrap gap-2">
                {hashtags.map((tag, i) => <Badge key={i} variant="secondary">{tag}</Badge>)}
            </div>
            {/* Placeholder for HashtagChips component */}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="emojis">Emojis</Label>
            <p className="text-xl p-2 border rounded-md">{editedEmojis}</p>
             {/* Placeholder for EmojiPicker component */}
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={handleImprovePost} disabled={isImproving}>
                {isImproving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4 text-accent" />}
                Improve with AI
            </Button>
            <div className="flex gap-2">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Cancel
                    </Button>
                </DialogClose>
                <Button type="button" onClick={handleSave}>Save Changes</Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
