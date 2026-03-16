// Purpose: Clean dream submission form.

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import type { PostCategory, PostVisibility } from '@/types/noctis';

const DreamForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<PostCategory>('dream');
  const [tags, setTags] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [visibility, setVisibility] = useState<PostVisibility>('public');
  const [isLucid, setIsLucid] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('TODO: Submit dream', { title, description, category, tags: tags.split(',').map(t => t.trim()), city, area, visibility, isLucid, isRecurring });
  };

  const selectClass = "w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all";
  const labelClass = "mb-1.5 block text-xs font-medium text-muted-foreground";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What did you experience?" className="border-border bg-secondary" />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe it in detail..." rows={5} className="border-border bg-secondary" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value as PostCategory)} className={selectClass}>
            <option value="dream">🌙 Dream</option>
            <option value="myth">📜 Myth</option>
            <option value="paranormal">👁️ Paranormal</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Visibility</label>
          <select value={visibility} onChange={(e) => setVisibility(e.target.value as PostVisibility)} className={selectClass}>
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="anonymous">Anonymous</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Tags (comma separated)</label>
        <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="recurring, water, shadow" className="border-border bg-secondary" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>City</label>
          <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Prague" className="border-border bg-secondary" />
        </div>
        <div>
          <label className={labelClass}>Area</label>
          <Input value={area} onChange={(e) => setArea(e.target.value)} placeholder="Old Town" className="border-border bg-secondary" />
        </div>
      </div>

      <div className="flex gap-5 text-sm text-muted-foreground">
        <label className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors">
          <input type="checkbox" checked={isLucid} onChange={() => setIsLucid(!isLucid)} className="accent-primary" />
          ✨ Lucid
        </label>
        <label className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors">
          <input type="checkbox" checked={isRecurring} onChange={() => setIsRecurring(!isRecurring)} className="accent-primary" />
          🔄 Recurring
        </label>
      </div>

      <Button type="submit" className="w-full btn-primary h-10 text-sm font-medium rounded-lg">
        <Send className="h-4 w-4 mr-2" />
        Submit
      </Button>
    </form>
  );
};

export default DreamForm;
