import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Agent, AgentState, FilterState } from '../../types/agent';

const initialState: AgentState = {
  agents: [],
  filteredAgents: [],
  filters: {
    searchQuery: '',
    statusFilters: [],
    categoryFilters: [],
    pricingModelFilter: '',
  },
  loading: false,
};

const agentSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    setAgents: (state, action: PayloadAction<Agent[]>) => {
      state.agents = action.payload;
      state.filteredAgents = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
      agentSlice.caseReducers.applyFilters(state);
    },
    setStatusFilters: (state, action: PayloadAction<string[]>) => {
      state.filters.statusFilters = action.payload;
      agentSlice.caseReducers.applyFilters(state);
    },
    setCategoryFilters: (state, action: PayloadAction<string[]>) => {
      state.filters.categoryFilters = action.payload;
      agentSlice.caseReducers.applyFilters(state);
    },
    setPricingModelFilter: (state, action: PayloadAction<string>) => {
      state.filters.pricingModelFilter = action.payload;
      agentSlice.caseReducers.applyFilters(state);
    },
    clearAllFilters: (state) => {
      state.filters = {
        searchQuery: '',
        statusFilters: [],
        categoryFilters: [],
        pricingModelFilter: '',
      };
      state.filteredAgents = state.agents;
    },
    applyFilters: (state) => {
      let filtered = state.agents;

      // Apply search query filter
      if (state.filters.searchQuery) {
        const query = state.filters.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (agent) =>
            agent.name.toLowerCase().includes(query) ||
            agent.description.toLowerCase().includes(query)
        );
      }

      // Apply status filters
      if (state.filters.statusFilters.length > 0) {
        filtered = filtered.filter((agent) =>
          state.filters.statusFilters.includes(agent.status)
        );
      }

      // Apply category filters
      if (state.filters.categoryFilters.length > 0) {
        filtered = filtered.filter((agent) =>
          state.filters.categoryFilters.includes(agent.category)
        );
      }

      // Apply pricing model filter
      if (state.filters.pricingModelFilter) {
        filtered = filtered.filter(
          (agent) => agent.pricingModel === state.filters.pricingModelFilter
        );
      }

      state.filteredAgents = filtered;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setAgents,
  setSearchQuery,
  setStatusFilters,
  setCategoryFilters,
  setPricingModelFilter,
  clearAllFilters,
  setLoading,
} = agentSlice.actions;

export default agentSlice.reducer;