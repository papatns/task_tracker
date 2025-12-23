import { useSelector, useDispatch } from 'react-redux';
import { setStatusFilter, clearFilters } from '../../features/filters/filtersSlice';
import { selectFilters } from '../../features/tasks/tasksSelectors';
import styles from './FilterBar.module.css';

const FilterBar = () => {
    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);

    const handleStatusChange = (status) => {
        dispatch(setStatusFilter(status));
    };

    const handleClearFilters = () => {
        dispatch(clearFilters());
    };

    const filterButtons = [
        { value: 'all', label: 'All Tasks' },
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
    ];

    const hasActiveFilters = filters.status !== 'all' || filters.searchQuery || filters.selectedCategory !== 'all';

    return (
        <div className={styles.filterBar} role="toolbar" aria-label="Task filters">
            <div className={styles.filterGroup}>
                {filterButtons.map((button) => (
                    <button
                        key={button.value}
                        onClick={() => handleStatusChange(button.value)}
                        className={`${styles.filterBtn} ${filters.status === button.value ? styles.active : ''
                            }`}
                        aria-pressed={filters.status === button.value}
                        aria-label={`Filter by ${button.label.toLowerCase()}`}
                    >
                        {button.label}
                    </button>
                ))}
            </div>

            {hasActiveFilters && (
                <button
                    onClick={handleClearFilters}
                    className={styles.clearBtn}
                    aria-label="Clear all filters"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    Clear Filters
                </button>
            )}
        </div>
    );
};

export default FilterBar;
