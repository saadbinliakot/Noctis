// Purpose: The main feed showing a vertical timeline of dream posts with floating cards.

import { useState } from 'react';
import { motion } from 'framer-motion';
import PostCard from '@/components/PostCard';
import type { Post } from '@/types/noctis';

const mockPosts: Post[] = [
  {
    _id: '1',
    title: 'The Man with the Clockwork Face',
    description: 'Every night for the past week, I see him standing at the foot of my bed. His face is made of gears and springs, ticking in rhythm with my heartbeat. When I try to speak, my voice comes out as smoke.',
    category: 'dream',
    tags: ['recurring', 'urban', 'mechanical'],
    city: 'Prague',
    area: 'Old Town',
    isLucid: false,
    isRecurring: true,
    visibility: 'public',
    timestamp: new Date('2026-03-12T02:15:00'),
    authorId: 'user1',
  },
  {
    _id: '2',
    title: 'Echoes from the Abandoned Hospital',
    description: "Recorded what sounds like a children's choir singing backwards in ward 7. The building has been empty for 30 years. Temperature dropped 12 degrees during the recording.",
    category: 'paranormal',
    tags: ['auditory', 'EVP', 'abandoned'],
    city: 'Chicago',
    area: 'Lincoln Park',
    isLucid: false,
    isRecurring: false,
    visibility: 'public',
    timestamp: new Date('2026-03-12T01:42:00'),
    authorId: 'user2',
  },
  {
    _id: '3',
    title: 'The Moth Priest of Appalachia',
    description: 'Local legend tells of a figure wrapped in moth wings who appears before mining disasters. Three separate families in the area reported seeing it last Tuesday.',
    category: 'myth',
    tags: ['mothman', 'appalachia', 'omen'],
    city: 'Point Pleasant',
    area: 'TNT Area',
    isLucid: false,
    isRecurring: false,
    visibility: 'public',
    timestamp: new Date('2026-03-11T03:20:00'),
    authorId: 'user3',
  },
  {
    _id: '4',
    title: 'Underwater Cathedral — Lucid Entry',
    description: 'I became aware I was dreaming when I noticed the stained glass windows were breathing. The cathedral was submerged and the pews were filled with faceless figures humming a single note.',
    category: 'dream',
    tags: ['lucid', 'underwater', 'cathedral', 'faceless'],
    city: 'Lisbon',
    area: 'Alfama',
    isLucid: true,
    isRecurring: false,
    visibility: 'public',
    timestamp: new Date('2026-03-11T02:55:00'),
    authorId: 'user4',
  },
  {
    _id: '5',
    title: 'Shadow Figures on the Dhaka Rooftops',
    description: 'Multiple residents in Dhanmondi reported seeing tall shadow figures standing motionless on rooftops between 2-3 AM. No footprints found. Security cameras show static during those hours.',
    category: 'paranormal',
    tags: ['shadow-figure', 'mass-sighting', 'urban'],
    city: 'Dhaka',
    area: 'Dhanmondi',
    isLucid: false,
    isRecurring: true,
    visibility: 'public',
    timestamp: new Date('2026-03-11T01:10:00'),
    authorId: 'user5',
  },
];

const NightFeed = () => {
  const [posts] = useState<Post[]>(mockPosts);

  return (
    <div className="fog-layer min-h-screen bg-starfield pt-20">
      <main className="container mx-auto max-w-2xl px-4 py-8 relative z-10 page-enter">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl glow-text mb-2">The Night Feed</h1>
          <p className="text-sm text-muted-foreground">Visions from the collective unconscious</p>
        </motion.div>

        {/* Timeline line */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/15 to-transparent ml-3 hidden md:block" />

          <div className="md:pl-10">
            {posts.map((post, i) => (
              <div key={post._id} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-10 top-8 w-2 h-2 rounded-full bg-primary/40 hidden md:block" style={{
                  boxShadow: '0 0 8px hsl(263 70% 58% / 0.4)',
                }} />
                <PostCard post={post} index={i} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NightFeed;
