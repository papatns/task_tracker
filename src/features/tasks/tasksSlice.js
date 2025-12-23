import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    tasks: [],
    history: {
        past: [],
        future: [],
    },
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            // Save current state to history
            state.history.past.push([...state.tasks]);
            state.history.future = [];

            const newTask = {
                id: uuidv4(),
                title: action.payload.title,
                description: action.payload.description || '',
                category: action.payload.category || 'General',
                priority: action.payload.priority || 'medium',
                completed: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            state.tasks.push(newTask);
        },

        updateTask: (state, action) => {
            // Save current state to history
            state.history.past.push([...state.tasks]);
            state.history.future = [];

            const { id, updates } = action.payload;
            const taskIndex = state.tasks.findIndex((task) => task.id === id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = {
                    ...state.tasks[taskIndex],
                    ...updates,
                    updatedAt: new Date().toISOString(),
                };
            }
        },

        deleteTask: (state, action) => {
            // Save current state to history
            state.history.past.push([...state.tasks]);
            state.history.future = [];

            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },

        toggleTask: (state, action) => {
            // Save current state to history
            state.history.past.push([...state.tasks]);
            state.history.future = [];

            const task = state.tasks.find((task) => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
                task.updatedAt = new Date().toISOString();
            }
        },

        reorderTasks: (state, action) => {
            // Save current state to history
            state.history.past.push([...state.tasks]);
            state.history.future = [];

            const { sourceIndex, destinationIndex } = action.payload;
            const [removed] = state.tasks.splice(sourceIndex, 1);
            state.tasks.splice(destinationIndex, 0, removed);
        },

        undo: (state) => {
            if (state.history.past.length > 0) {
                state.history.future.push([...state.tasks]);
                state.tasks = state.history.past.pop();
            }
        },

        redo: (state) => {
            if (state.history.future.length > 0) {
                state.history.past.push([...state.tasks]);
                state.tasks = state.history.future.pop();
            }
        },

        importTasks: (state, action) => {
            // Save current state to history
            state.history.past.push([...state.tasks]);
            state.history.future = [];

            state.tasks = action.payload;
        },

        clearAllTasks: (state) => {
            // Save current state to history
            state.history.past.push([...state.tasks]);
            state.history.future = [];

            state.tasks = [];
        },
    },
});

export const {
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    reorderTasks,
    undo,
    redo,
    importTasks,
    clearAllTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
