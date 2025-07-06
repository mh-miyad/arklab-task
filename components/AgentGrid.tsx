"use client";

import { useAppSelector } from "@/store/hooks";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import AgentCard from "./AgentCard";

export default function AgentGrid() {
  const { filteredAgents, loading } = useAppSelector((state) => state.agents);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Bot className="w-8 h-8 text-primary" />
        </motion.div>
      </div>
    );
  }

  if (filteredAgents.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <Bot className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No agents found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search query to find the perfect AI
          agent.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAgents.map((agent, index) => (
        <AgentCard key={agent.id} agent={agent} index={index} />
      ))}
    </div>
  );
}
