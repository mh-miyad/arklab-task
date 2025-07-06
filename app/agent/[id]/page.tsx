'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Agent } from '@/types/agent';
import { ArrowLeft, Bot, DollarSign, Target, Activity, Heart, Share2, ExternalLink, Star, Users, Clock, Shield } from 'lucide-react';
import mockAgents from '@/data/mock-agents.json';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleFavorite } from '@/store/slices/favoritesSlice';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Beta':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Archived':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getPricingColor = (pricingModel: string) => {
  switch (pricingModel) {
    case 'Free Tier':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Subscription':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Per-Use':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Customer Service':
      return <Target className="w-6 h-6" />;
    case 'Marketing':
      return <Activity className="w-6 h-6" />;
    case 'Development':
      return <Bot className="w-6 h-6" />;
    default:
      return <Bot className="w-6 h-6" />;
  }
};

export default function AgentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const agentId = params.id as string;
    const foundAgent = (mockAgents as Agent[]).find(a => a.id === agentId);
    setAgent(foundAgent || null);
    setLoading(false);
  }, [params.id]);

  const handleToggleFavorite = () => {
    if (agent && session) {
      dispatch(toggleFavorite(agent.id));
    }
  };

  const handleShare = async () => {
    if (navigator.share && agent) {
      try {
        await navigator.share({
          title: agent.name,
          text: agent.description,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Bot className="w-8 h-8 text-primary" />
        </motion.div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <Bot className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Agent Not Found</h1>
          <p className="text-muted-foreground mb-4">The requested agent could not be found.</p>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Catalog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.includes(agent.id);

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        {getCategoryIcon(agent.category)}
                      </div>
                      <div>
                        <CardTitle className="text-3xl font-bold mb-2">
                          {agent.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className={getStatusColor(agent.status)}>
                            {agent.status}
                          </Badge>
                          <Badge variant="outline">
                            {agent.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>4.8 (127 reviews)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>2.3k users</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {session && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleToggleFavorite}
                          className={isFavorite ? 'text-red-600 border-red-200' : ''}
                        >
                          <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                          {isFavorite ? 'Favorited' : 'Add to Favorites'}
                        </Button>
                      )}
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {agent.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span>Enterprise Security</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span>24/7 Availability</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Bot className="w-5 h-5 text-purple-600" />
                      <span>AI-Powered</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <ExternalLink className="w-5 h-5 text-orange-600" />
                      <span>API Integration</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Documentation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Documentation & Usage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Getting Started</h4>
                    <p className="text-muted-foreground">
                      This AI agent can be integrated into your existing workflow with minimal setup. 
                      Follow our comprehensive documentation to get started in minutes.
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Use Cases</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Automated customer support responses</li>
                      <li>Lead qualification and routing</li>
                      <li>Knowledge base integration</li>
                      <li>Multi-language support</li>
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Technical Requirements</h4>
                    <p className="text-muted-foreground">
                      Compatible with REST APIs, webhooks, and major CRM platforms. 
                      Requires minimal technical setup and can be deployed in cloud or on-premises environments.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Badge
                      variant="outline"
                      className={`${getPricingColor(agent.pricingModel)} text-lg px-3 py-1`}
                    >
                      {agent.pricingModel}
                    </Badge>
                    <div className="space-y-2">
                      {agent.pricingModel === 'Free Tier' && (
                        <div>
                          <div className="text-2xl font-bold">Free</div>
                          <p className="text-sm text-muted-foreground">
                            Up to 1,000 requests per month
                          </p>
                        </div>
                      )}
                      {agent.pricingModel === 'Subscription' && (
                        <div>
                          <div className="text-2xl font-bold">$29/month</div>
                          <p className="text-sm text-muted-foreground">
                            Unlimited requests, priority support
                          </p>
                        </div>
                      )}
                      {agent.pricingModel === 'Per-Use' && (
                        <div>
                          <div className="text-2xl font-bold">$0.05/request</div>
                          <p className="text-sm text-muted-foreground">
                            Pay only for what you use
                          </p>
                        </div>
                      )}
                    </div>
                    <Button className="w-full" size="lg">
                      Get Started
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-semibold">{"< 200ms"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Accuracy</span>
                    <span className="font-semibold">98.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uptime</span>
                    <span className="font-semibold">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Languages</span>
                    <span className="font-semibold">25+</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Support Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Support & Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Documentation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    API Reference
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Community Forum
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}