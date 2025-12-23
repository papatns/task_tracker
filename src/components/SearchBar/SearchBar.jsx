import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../features/filters/filtersSlice';
import { selectFilters } from '../../features/tasks/tasksSelectors';
import styles from './SearchBar.module.css';

const SearchBar = () => {
    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);
    const [localQuery, setLocalQuery] = useState(filters.searchQuery);
    const searchInputRef = useRef(null);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setSearchQuery(localQuery));
        }, 300);

        return () => clearTimeout(timer);
    }, [localQuery, dispatch]);

    const handleChange = (e) => {
        setLocalQuery(e.target.value);
    };

    const handleClear = () => {
        setLocalQuery('');
        dispatch(setSearchQuery(''));
        searchInputRef.current?.focus();
    };

    // Expose focus method for keyboard shortcuts
    useEffect(() => {
        window.focusSearch = () => {
            searchInputRef.current?.focus();
        };

        return () => {
            delete window.focusSearch;
        };
    }, []);

    return (
        <div className={styles.searchBar}>
            <div className={styles.searchIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
            </div>
            <input
                ref={searchInputRef}
                type="text"
                value={localQuery}
                onChange={handleChange}
                placeholder="Search tasks... (Press / to focus)"
                className={styles.searchInput}
                aria-label="Search tasks"
            />
            {localQuery && (
                <button
                    onClick={handleClear}
                    className={styles.clearBtn}
                    aria-label="Clear search"
                    title="Clear search"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default SearchBar;
