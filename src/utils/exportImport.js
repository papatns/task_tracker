export const exportTasks = (tasks) => {
    try {
        const dataStr = JSON.stringify(tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `tasks-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        return { success: true };
    } catch (error) {
        console.error('Error exporting tasks:', error);
        return { success: false, error: error.message };
    }
};

export const importTasks = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const tasks = JSON.parse(e.target.result);

                // Validate the imported data
                if (!Array.isArray(tasks)) {
                    throw new Error('Invalid format: expected an array of tasks');
                }

                // Validate each task has required fields
                const isValid = tasks.every(
                    (task) =>
                        task.id &&
                        task.title &&
                        typeof task.completed === 'boolean' &&
                        task.createdAt
                );

                if (!isValid) {
                    throw new Error('Invalid task format: missing required fields');
                }

                resolve({ success: true, tasks });
            } catch (error) {
                reject({ success: false, error: error.message });
            }
        };

        reader.onerror = () => {
            reject({ success: false, error: 'Failed to read file' });
        };

        reader.readAsText(file);
    });
};
