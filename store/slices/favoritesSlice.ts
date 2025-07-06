import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  items: string[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const agentId = action.payload;
      const index = state.items.indexOf(agentId);
      
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(agentId);
      }
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      const agentId = action.payload;
      if (!state.items.includes(agentId)) {
        state.items.push(agentId);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      const agentId = action.payload;
      state.items = state.items.filter(id => id !== agentId);
    },
    clearFavorites: (state) => {
      state.items = [];
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  toggleFavorite,
  addFavorite,
  removeFavorite,
  clearFavorites,
  setFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;