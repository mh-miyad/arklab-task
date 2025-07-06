"use client";

import AgentGrid from "@/components/AgentGrid";
import FilterPanel from "@/components/FilterPanel";
import Header from "@/components/Header";
import mockAgents from "@/data/mock-agents.json";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAgents } from "@/store/slices/agentSlice";
import { Agent } from "@/types/agent";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { agents } = useAppSelector((state) => state.agents);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (agents.length === 0) {
      dispatch(setAgents(mockAgents as Agent[]));
    }
  }, [dispatch, agents.length]);

  if (status === "loading") {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5"
    >
      <Header />
      <div className=" max-w-[1320px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div>
            <FilterPanel />
          </div>
          <AgentGrid />
        </div>
      </div>
    </motion.div>
  );
}
