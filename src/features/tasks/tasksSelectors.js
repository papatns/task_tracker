import { createSelector } from '@reduxjs/toolkit';

// Base selectors
export const selectAllTasks = (state) => state.tasks.tasks;
export const selectFilters = (state) => state.filters;
export const selectHistory = (state) => state.tasks.history;

// Memoized selector for filtered tasks
export const selectFilteredTasks = createSelector(
    [selectAllTasks, selectFilters],
    (tasks, filters) => {
        let filtered = [...tasks];

        // Filter by status
        if (filters.status === 'active') {
            filtered = filtered.filter((task) => !task.completed);
        } else if (filters.status === 'completed') {
            filtered = filtered.filter((task) => task.completed);
        }

        // Filter by category
        if (filters.selectedCategory && filters.selectedCategory !== 'all') {
            filtered = filtered.filter((task) => task.category === filters.selectedCategory);
        }

        // Filter by search query
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            filtered = filtered.filter(
                (task) =>
                    task.title.toLowerCase().includes(query) ||
                    task.description.toLowerCase().includes(query)
            );
        }

        return filtered;
    }
);

// Selector for task statistics
export const selectTaskStats = createSelector([selectAllTasks], (tasks) => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const active = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Tasks by category
    const byCategory = tasks.reduce((acc, task) => {
        acc[task.category] = (acc[task.category] || 0) + 1;
        return acc;
    }, {});

    // Tasks by priority
    const byPriority = {
        high: tasks.filter((task) => task.priority === 'high').length,
        medium: tasks.filter((task) => task.priority === 'medium').length,
        low: tasks.filter((task) => task.priority === 'low').length,
    };

    // Tasks created over time (last 7 days)
    const now = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(now);
        date.setDate(date.getDate() - (6 - i));
        return date.toISOString().split('T')[0];
    });

    const tasksByDate = last7Days.map((date) => {
        const count = tasks.filter((task) => task.createdAt.startsWith(date)).length;
        return { date, count };
    });

    return {
        total,
        completed,
        active,
        completionRate,
        byCategory,
        byPriority,
        tasksByDate,
    };
});

// Selector for unique categories
export const selectCategories = createSelector([selectAllTasks], (tasks) => {
    const categories = new Set(tasks.map((task) => task.category));
    return Array.from(categories).sort();
});

// Selector for undo/redo availability
export const selectCanUndo = (state) => state.tasks.history.past.length > 0;
export const selectCanRedo = (state) => state.tasks.history.future.length > 0;
