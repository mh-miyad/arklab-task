export interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Beta' | 'Archived';
  category: string;
  pricingModel: 'Free Tier' | 'Subscription' | 'Per-Use';
}

export interface FilterState {
  searchQuery: string;
  statusFilters: string[];
  categoryFilters: string[];
  pricingModelFilter: string;
}

export interface AgentState {
  agents: Agent[];
  filteredAgents: Agent[];
  filters: FilterState;
  loading: boolean;
}