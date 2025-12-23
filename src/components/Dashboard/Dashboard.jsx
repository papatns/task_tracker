import { useSelector, useDispatch } from 'react-redux';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { selectTaskStats, selectAllTasks } from '../../features/tasks/tasksSelectors';
import { exportTasks, importTasks } from '../../utils/exportImport';
import { importTasks as importTasksAction } from '../../features/tasks/tasksSlice';
import styles from './Dashboard.module.css';

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const dispatch = useDispatch();
    const stats = useSelector(selectTaskStats);
    const allTasks = useSelector(selectAllTasks);

    const handleExport = () => {
        const result = exportTasks(allTasks);
        if (result.success) {
            alert('Tasks exported successfully!');
        } else {
            alert(`Export failed: ${result.error}`);
        }
    };

    const handleImport = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const result = await importTasks(file);
            if (result.success) {
                dispatch(importTasksAction(result.tasks));
                alert(`Successfully imported ${result.tasks.length} tasks!`);
            }
        } catch (error) {
            alert(`Import failed: ${error.error}`);
        }

        // Reset file input
        e.target.value = '';
    };

    // Pie chart data - Completion status
    const pieData = {
        labels: ['Completed', 'Active'],
        datasets: [
            {
                data: [stats.completed, stats.active],
                backgroundColor: ['hsl(142, 71%, 45%)', 'hsl(250, 84%, 54%)'],
                borderColor: ['hsl(142, 71%, 35%)', 'hsl(250, 84%, 44%)'],
                borderWidth: 2,
            },
        ],
    };

    // Bar chart data - Tasks by category
    const barData = {
        labels: Object.keys(stats.byCategory),
        datasets: [
            {
                label: 'Tasks',
                data: Object.values(stats.byCategory),
                backgroundColor: 'hsla(250, 84%, 54%, 0.8)',
                borderColor: 'hsl(250, 84%, 54%)',
                borderWidth: 2,
                borderRadius: 8,
            },
        ],
    };

    // Line chart data - Tasks created over time
    const lineData = {
        labels: stats.tasksByDate.map((item) => {
            const date = new Date(item.date);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }),
        datasets: [
            {
                label: 'Tasks Created',
                data: stats.tasksByDate.map((item) => item.count),
                borderColor: 'hsl(250, 84%, 54%)',
                backgroundColor: 'hsla(250, 84%, 54%, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: 'hsl(250, 84%, 54%)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'hsl(0, 0%, 95%)',
                    font: {
                        size: 12,
                        family: 'Inter',
                    },
                },
            },
            tooltip: {
                backgroundColor: 'hsla(240, 17%, 20%, 0.95)',
                titleColor: 'hsl(0, 0%, 95%)',
                bodyColor: 'hsl(0, 0%, 95%)',
                borderColor: 'hsl(240, 15%, 40%)',
                borderWidth: 1,
                padding: 12,
                displayColors: true,
            },
        },
        scales: {
            x: {
                ticks: { color: 'hsl(0, 0%, 70%)' },
                grid: { color: 'hsla(240, 15%, 40%, 0.1)' },
            },
            y: {
                ticks: { color: 'hsl(0, 0%, 70%)' },
                grid: { color: 'hsla(240, 15%, 40%, 0.1)' },
            },
        },
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h2 className={styles.title}>Dashboard</h2>
                <div className={styles.actions}>
                    <button onClick={handleExport} className={styles.btnExport} aria-label="Export tasks">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Export
                    </button>
                    <label className={styles.btnImport} aria-label="Import tasks">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        Import
                        <input type="file" accept=".json" onChange={handleImport} className={styles.fileInput} />
                    </label>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'hsla(250, 84%, 54%, 0.15)' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 11l3 3L22 4" />
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                    </div>
                    <div className={styles.statContent}>
                        <p className={styles.statLabel}>Total Tasks</p>
                        <p className={styles.statValue}>{stats.total}</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'hsla(142, 71%, 45%, 0.15)' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <div className={styles.statContent}>
                        <p className={styles.statLabel}>Completed</p>
                        <p className={styles.statValue}>{stats.completed}</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'hsla(45, 93%, 58%, 0.15)' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>
                    <div className={styles.statContent}>
                        <p className={styles.statLabel}>Active</p>
                        <p className={styles.statValue}>{stats.active}</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'hsla(280, 70%, 60%, 0.15)' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="1" x2="12" y2="23" />
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </div>
                    <div className={styles.statContent}>
                        <p className={styles.statLabel}>Completion Rate</p>
                        <p className={styles.statValue}>{stats.completionRate}%</p>
                    </div>
                </div>
            </div>

            {/* Charts */}
            {stats.total > 0 && (
                <div className={styles.chartsGrid}>
                    <div className={styles.chartCard}>
                        <h3 className={styles.chartTitle}>Task Status</h3>
                        <div className={styles.chartContainer}>
                            <Pie data={pieData} options={{ ...chartOptions, scales: undefined }} />
                        </div>
                    </div>

                    <div className={styles.chartCard}>
                        <h3 className={styles.chartTitle}>Tasks by Category</h3>
                        <div className={styles.chartContainer}>
                            <Bar data={barData} options={chartOptions} />
                        </div>
                    </div>

                    <div className={`${styles.chartCard} ${styles.chartCardWide}`}>
                        <h3 className={styles.chartTitle}>Tasks Created (Last 7 Days)</h3>
                        <div className={styles.chartContainer}>
                            <Line data={lineData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            )}

            {stats.total === 0 && (
                <div className={styles.emptyState}>
                    <p>No data to display. Start creating tasks to see statistics!</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
