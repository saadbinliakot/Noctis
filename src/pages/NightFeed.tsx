// Purpose: The main feed showing a timeline of dream/myth/paranormal posts.

import { useState } from 'react';
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
    timestamp: new Date(),
    authorId: 'user1',
  },
  {
    _id: '2',
    title: 'Echoes from the Abandoned Hospital',
    description: 'Recorded what sounds like a children\'s choir singing backwards in ward 7. The building has been empty for 30 years. Temperature dropped 12 degrees during the recording.',
    category: 'paranormal',
    tags: ['auditory', 'EVP', 'abandoned'],
    city: 'Chicago',
    area: 'Lincoln Park',
    isLucid: false,
    isRecurring: false,
    visibility: 'public',
    timestamp: new Date(),
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
    timestamp: new Date(),
    authorId: 'user3',
  },
];

const NightFeed = () => {
  const [posts] = useState<Post[]>(mockPosts);

  return (
    <div className="fog-overlay min-h-screen pt-20">
      <main className="container mx-auto max-w-2xl px-4 py-8 relative z-10">
        <h1 className="mb-8 text-center text-3xl glow-text">The Night Feed</h1>
        {posts.map((post, i) => (
          <PostCard key={post._id} post={post} index={i} />
        ))}
      </main>
    </div>
  );
};

export default NightFeed;
