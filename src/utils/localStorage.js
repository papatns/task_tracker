const STATE_KEY = 'taskTrackerState';

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(STATE_KEY);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Error loading state from localStorage:', err);
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(STATE_KEY, serializedState);
    } catch (err) {
        // Handle quota exceeded error
        if (err.name === 'QuotaExceededError') {
            console.error('localStorage quota exceeded');
            // Could implement cleanup logic here
        } else {
            console.error('Error saving state to localStorage:', err);
        }
    }
};

export const clearState = () => {
    try {
        localStorage.removeItem(STATE_KEY);
    } catch (err) {
        console.error('Error clearing state from localStorage:', err);
    }
};
