import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { undo, redo } from './features/tasks/tasksSlice';
import { selectCanUndo, selectCanRedo } from './features/tasks/tasksSelectors';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import Dashboard from './components/Dashboard';
import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const canUndo = useSelector(selectCanUndo);
  const canRedo = useSelector(selectCanRedo);
  const [currentView, setCurrentView] = useState('tasks'); // 'tasks' or 'dashboard'
  const [showTaskForm, setShowTaskForm] = useState(false);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onUndo: () => canUndo && dispatch(undo()),
    onRedo: () => canRedo && dispatch(redo()),
    onNewTask: () => {
      setCurrentView('tasks');
      setShowTaskForm(true);
    },
    onFocusSearch: () => {
      window.focusSearch?.();
    },
    onEscape: () => {
      setShowTaskForm(false);
    },
  });

  return (
    <div className={styles.app}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.branding}>
            <div className={styles.logo}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <h1 className={styles.title}>Task Tracker</h1>
          </div>

          <div className={styles.headerActions}>
            {/* View Toggle */}
            <div className={styles.viewToggle} role="tablist" aria-label="View selector">
              <button
                onClick={() => setCurrentView('tasks')}
                className={`${styles.viewBtn} ${currentView === 'tasks' ? styles.active : ''}`}
                role="tab"
                aria-selected={currentView === 'tasks'}
                aria-controls="tasks-panel"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                Tasks
              </button>
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`${styles.viewBtn} ${currentView === 'dashboard' ? styles.active : ''}`}
                role="tab"
                aria-selected={currentView === 'dashboard'}
                aria-controls="dashboard-panel"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                Dashboard
              </button>
            </div>

            {/* Undo/Redo */}
            <div className={styles.historyActions}>
              <button
                onClick={() => dispatch(undo())}
                disabled={!canUndo}
                className={styles.btnIcon}
                aria-label="Undo (Ctrl+Z)"
                title="Undo (Ctrl+Z)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 7v6h6" />
                  <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                </svg>
              </button>
              <button
                onClick={() => dispatch(redo())}
                disabled={!canRedo}
                className={styles.btnIcon}
                aria-label="Redo (Ctrl+Y)"
                title="Redo (Ctrl+Y)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 7v6h-6" />
                  <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
                </svg>
              </button>
            </div>

            {/* New Task Button */}
            {currentView === 'tasks' && (
              <button
                onClick={() => setShowTaskForm(!showTaskForm)}
                className={styles.btnPrimary}
                aria-label="New task (Ctrl+N)"
                title="New task (Ctrl+N)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                New Task
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.container}>
          {currentView === 'tasks' ? (
            <div id="tasks-panel" role="tabpanel" aria-labelledby="tasks-tab">
              {/* Task Form */}
              {showTaskForm && (
                <div className={styles.formSection}>
                  <TaskForm onCancel={() => setShowTaskForm(false)} />
                </div>
              )}

              {/* Search and Filters */}
              <SearchBar />
              <FilterBar />

              {/* Task List */}
              <TaskList />
            </div>
          ) : (
            <div id="dashboard-panel" role="tabpanel" aria-labelledby="dashboard-tab">
              <Dashboard />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p className={styles.footerText}>
            Task Tracker &copy; 2024
          </p>
          </div>
      </footer>
    </div>
  );
}

export default App;
