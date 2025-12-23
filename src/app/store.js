import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';
import filtersReducer from '../features/filters/filtersSlice';
import { loadState, saveState } from '../utils/localStorage';

// Load persisted state
const persistedState = loadState();

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
  },
  preloadedState: persistedState,
});

// Subscribe to store changes and persist to localStorage
store.subscribe(() => {
  saveState({
    tasks: store.getState().tasks,
    filters: store.getState().filters,
  });
});

export default store;
