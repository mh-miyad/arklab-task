'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Agent } from '@/types/agent';
import { Bot, DollarSign, Target, Activity, Heart, ExternalLink } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleFavorite } from '@/store/slices/favoritesSlice';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface AgentCardProps {
  agent: Agent;
  index: number;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
    case 'Beta':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
    case 'Archived':
      return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
  }
};

const getPricingColor = (pricingModel: string) => {
  switch (pricingModel) {
    case 'Free Tier':
      return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800';
    case 'Subscription':
      return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800';
    case 'Per-Use':
      return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Customer Service':
      return <Target className="w-4 h-4" />;
    case 'Marketing':
      return <Activity className="w-4 h-4" />;
    case 'Development':
      return <Bot className="w-4 h-4" />;
    default:
      return <Bot className="w-4 h-4" />;
  }
};

export default function AgentCard({ agent, index }: AgentCardProps) {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.includes(agent.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (session) {
      dispatch(toggleFavorite(agent.id));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Link href={`/agent/${agent.id}`}>
        <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-2 hover:border-primary/20 cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {getCategoryIcon(agent.category)}
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold line-clamp-1">
                    {agent.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {agent.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Badge
                  variant="outline"
                  className={getStatusColor(agent.status)}
                >
                  {agent.status}
                </Badge>
                {session && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={handleToggleFavorite}
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        isFavorite 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-muted-foreground hover:text-red-500'
                      }`} 
                    />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {agent.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <Badge
                  variant="outline"
                  className={getPricingColor(agent.pricingModel)}
                >
                  {agent.pricingModel}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}