// Purpose: Clean vertical feed of dream posts.

import { useState } from 'react';
import { motion } from 'framer-motion';
import PostCard from '@/components/PostCard';
import SharedDreamAlert from '@/components/SharedDreamAlert';
import type { Post } from '@/types/noctis';

const mockPosts: Post[] = [
  {
    _id: '1', title: 'The Man with the Clockwork Face',
    description: 'Every night for the past week, I see him standing at the foot of my bed. His face is made of gears and springs, ticking in rhythm with my heartbeat. When I try to speak, my voice comes out as smoke.',
    category: 'dream', tags: ['recurring', 'urban', 'mechanical'], city: 'Prague', area: 'Old Town',
    isLucid: false, isRecurring: true, visibility: 'public', timestamp: new Date('2026-03-12T02:15:00'), authorId: 'user1',
  },
  {
    _id: '2', title: 'Echoes from the Abandoned Hospital',
    description: "Recorded what sounds like a children's choir singing backwards in ward 7. The building has been empty for 30 years.",
    category: 'paranormal', tags: ['auditory', 'EVP', 'abandoned'], city: 'Chicago', area: 'Lincoln Park',
    isLucid: false, isRecurring: false, visibility: 'public', timestamp: new Date('2026-03-12T01:42:00'), authorId: 'user2',
  },
  {
    _id: '3', title: 'The Moth Priest of Appalachia',
    description: 'Local legend tells of a figure wrapped in moth wings who appears before mining disasters. Three separate families reported seeing it last Tuesday.',
    category: 'myth', tags: ['mothman', 'appalachia', 'omen'], city: 'Point Pleasant', area: 'TNT Area',
    isLucid: false, isRecurring: false, visibility: 'public', timestamp: new Date('2026-03-11T03:20:00'), authorId: 'user3',
  },
  {
    _id: '4', title: 'Underwater Cathedral — Lucid Entry',
    description: 'I became aware I was dreaming when I noticed the stained glass windows were breathing. The cathedral was submerged.',
    category: 'dream', tags: ['lucid', 'underwater', 'cathedral'], city: 'Lisbon', area: 'Alfama',
    isLucid: true, isRecurring: false, visibility: 'public', timestamp: new Date('2026-03-11T02:55:00'), authorId: 'user4',
  },
  {
    _id: '5', title: 'Shadow Figures on the Dhaka Rooftops',
    description: 'Multiple residents reported seeing tall shadow figures standing motionless on rooftops between 2-3 AM. No footprints found.',
    category: 'paranormal', tags: ['shadow-figure', 'mass-sighting', 'urban'], city: 'Dhaka', area: 'Dhanmondi',
    isLucid: false, isRecurring: true, visibility: 'public', timestamp: new Date('2026-03-11T01:10:00'), authorId: 'user5',
  },
];

const trendingTags = ['shadow-figure', 'lucid', 'water', 'falling', 'cathedral', 'mechanical', 'omen'];

const NightFeed = () => {
  const [posts] = useState<Post[]>(mockPosts);

  return (
    <div className="min-h-screen bg-starfield pt-14">
      <main className="container mx-auto max-w-5xl px-4 py-8 page-enter">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          {/* Main feed */}
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
              <h1 className="text-2xl font-heading font-semibold mb-1">Night Feed</h1>
              <p className="text-sm text-muted-foreground">Recent dreams and experiences</p>
            </motion.div>

            {posts.map((post, i) => (
              <PostCard key={post._id} post={post} index={i} />
            ))}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-4">
            <SharedDreamAlert
              theme="Shadow Figures"
              location="Dhaka – Dhanmondi"
              userCount={4}
              timeWindow="Last 24 hours"
            />

            <div className="noctis-card p-4">
              <h3 className="text-sm font-heading font-medium mb-3">Trending Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {trendingTags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground hover:text-primary hover:border-primary/20 transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default NightFeed;
