import { useEffect } from 'react';

export const useKeyboardShortcuts = (handlers) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            // Ctrl+Z or Cmd+Z for undo
            if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
                event.preventDefault();
                handlers.onUndo?.();
            }

            // Ctrl+Y or Cmd+Shift+Z for redo
            if (
                ((event.ctrlKey || event.metaKey) && event.key === 'y') ||
                ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'z')
            ) {
                event.preventDefault();
                handlers.onRedo?.();
            }

            // Ctrl+N or Cmd+N for new task
            if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
                event.preventDefault();
                handlers.onNewTask?.();
            }

            // / to focus search
            if (event.key === '/' && !event.ctrlKey && !event.metaKey) {
                const activeElement = document.activeElement;
                if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                    event.preventDefault();
                    handlers.onFocusSearch?.();
                }
            }

            // Escape to clear focus or close modals
            if (event.key === 'Escape') {
                handlers.onEscape?.();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handlers]);
};
