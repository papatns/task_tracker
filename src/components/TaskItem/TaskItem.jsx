import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask } from '../../features/tasks/tasksSlice';
import TaskForm from '../TaskForm';
import styles from './TaskItem.module.css';

const TaskItem = ({ task, provided, snapshot }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const handleToggle = () => {
        dispatch(toggleTask(task.id));
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            dispatch(deleteTask(task.id));
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const getPriorityClass = () => {
        switch (task.priority) {
            case 'high':
                return styles.priorityHigh;
            case 'medium':
                return styles.priorityMedium;
            case 'low':
                return styles.priorityLow;
            default:
                return '';
        }
    };

    if (isEditing) {
        return (
            <div className={styles.taskItem}>
                <TaskForm taskToEdit={task} onCancel={handleCancelEdit} />
            </div>
        );
    }

    return (
        <div
            ref={provided?.innerRef}
            {...provided?.draggableProps}
            {...provided?.dragHandleProps}
            className={`${styles.taskItem} ${task.completed ? styles.completed : ''} ${snapshot?.isDragging ? styles.dragging : ''
                } ${getPriorityClass()}`}
            role="article"
            aria-label={`Task: ${task.title}`}
        >
            <div className={styles.priorityIndicator} aria-hidden="true" />

            <div className={styles.taskContent}>
                <div className={styles.taskHeader}>
                    <label className={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={handleToggle}
                            className={styles.checkbox}
                            aria-label={`Mark task "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
                        />
                        <span className={styles.checkmark} aria-hidden="true">
                            {task.completed && (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )}
                        </span>
                    </label>

                    <div className={styles.taskInfo}>
                        <h3 className={styles.taskTitle}>{task.title}</h3>
                        {task.description && (
                            <p className={styles.taskDescription}>{task.description}</p>
                        )}
                    </div>
                </div>

                <div className={styles.taskMeta}>
                    <span className={`${styles.badge} ${styles.categoryBadge}`}>
                        {task.category}
                    </span>
                    <span className={`${styles.badge} ${styles.priorityBadge}`}>
                        {task.priority}
                    </span>
                </div>
            </div>

            <div className={styles.taskActions}>
                <button
                    onClick={handleEdit}
                    className={styles.btnIcon}
                    aria-label={`Edit task "${task.title}"`}
                    title="Edit task"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                </button>
                <button
                    onClick={handleDelete}
                    className={`${styles.btnIcon} ${styles.btnDelete}`}
                    aria-label={`Delete task "${task.title}"`}
                    title="Delete task"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
