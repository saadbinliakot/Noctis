// Purpose: Form for submitting a new dream/myth/paranormal experience.
// TODO: Connect to backend POST /api/posts.
// TODO: Implement midnight posting restriction (12AM–4AM).

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
    // TODO: Submit to API
    console.log('TODO: Submit dream', { title, description, category, tags: tags.split(',').map(t => t.trim()), city, area, visibility, isLucid, isRecurring });
  };

  const selectClass = "w-full rounded-md border border-primary/10 bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="The figure at the end of the hallway..." className="border-primary/10 bg-secondary" />
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Description</label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe what you experienced..." rows={5} className="border-primary/10 bg-secondary" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value as PostCategory)} className={selectClass}>
            <option value="dream">Dream</option>
            <option value="myth">Myth</option>
            <option value="paranormal">Paranormal</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Visibility</label>
          <select value={visibility} onChange={(e) => setVisibility(e.target.value as PostVisibility)} className={selectClass}>
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="anonymous">Anonymous</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Tags (comma separated)</label>
        <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="recurring, water, shadow figure" className="border-primary/10 bg-secondary" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">City</label>
          <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Prague" className="border-primary/10 bg-secondary" />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Area</label>
          <Input value={area} onChange={(e) => setArea(e.target.value)} placeholder="Old Town" className="border-primary/10 bg-secondary" />
        </div>
      </div>

      <div className="flex gap-6 text-sm text-muted-foreground">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={isLucid} onChange={() => setIsLucid(!isLucid)} className="accent-primary" />
          Lucid
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={isRecurring} onChange={() => setIsRecurring(!isRecurring)} className="accent-primary" />
          Recurring
        </label>
      </div>

      <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
        Submit to the Void
      </Button>
    </form>
  );
};

export default DreamForm;
