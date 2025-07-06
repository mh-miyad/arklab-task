'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setAgents } from '@/store/slices/agentSlice';
import { Agent } from '@/types/agent';
import Header from '@/components/Header';
import AgentCard from '@/components/AgentCard';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft } from 'lucide-react';
import mockAgents from '@/data/mock-agents.json';
import Link from 'next/link';

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { agents } = useAppSelector((state) => state.agents);
  const favorites = useAppSelector((state) => state.favorites.items);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (agents.length === 0) {
      dispatch(setAgents(mockAgents as Agent[]));
    }
  }, [dispatch, agents.length]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Heart className="w-8 h-8 text-primary" />
        </motion.div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const favoriteAgents = agents.filter(agent => favorites.includes(agent.id));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Catalog
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-red-100 rounded-xl">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Your Favorites
              </h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Your personally curated collection of AI agents. Keep track of the tools that matter most to your workflow.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>
              <strong>{favoriteAgents.length}</strong> favorite{favoriteAgents.length !== 1 ? 's' : ''}
            </span>
            <span>•</span>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </motion.div>

        {/* Favorites Grid */}
        {favoriteAgents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-4">
              Start exploring our AI agents catalog and add your favorites to see them here.
            </p>
            <Link href="/">
              <Button>
                Explore Agents
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteAgents.map((agent, index) => (
              <AgentCard key={agent.id} agent={agent} index={index} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}