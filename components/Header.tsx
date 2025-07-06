'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooks';
import { Bot, Sparkles, Heart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import AuthButton from './AuthButton';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';

export default function Header() {
  const { filteredAgents, agents } = useAppSelector((state) => state.agents);
  const favorites = useAppSelector((state) => state.favorites.items);
  const { data: session } = useSession();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      {/* Navigation Bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-semibold">ArkLab</span>
        </div>
        <div className="flex items-center gap-3">
          {session && (
            <Link href="/favorites">
              <Button variant="outline" size="sm" className="relative">
                <Heart className="w-4 h-4 mr-2" />
                Favorites
                {favorites.length > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {favorites.length}
                  </Badge>
                )}
              </Button>
            </Link>
          )}
          <ThemeToggle />
          <AuthButton />
        </div>
      </div>

      {/* Main Header Content */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Bot className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              ArkLab AI Agents
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <Badge variant="secondary" className="text-sm">
                Professional AI Solutions
              </Badge>
            </div>
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Discover and explore our comprehensive catalog of AI agents designed to transform your business operations.
          From customer service to data analysis, find the perfect AI solution for your needs.
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span>
            Showing <strong>{filteredAgents.length}</strong> of <strong>{agents.length}</strong> agents
          </span>
          <span>•</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
}