import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'all', // 'all' | 'active' | 'completed'
    searchQuery: '',
    selectedCategory: 'all',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setStatusFilter: (state, action) => {
            state.status = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        clearFilters: (state) => {
            state.status = 'all';
            state.searchQuery = '';
            state.selectedCategory = 'all';
        },
    },
});

export const { setStatusFilter, setSearchQuery, setCategory, clearFilters } =
    filtersSlice.actions;

export default filtersSlice.reducer;
