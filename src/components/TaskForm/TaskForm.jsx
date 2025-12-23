import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../../features/tasks/tasksSlice';
import styles from './TaskForm.module.css';

const TaskForm = ({ taskToEdit = null, onCancel = null }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: taskToEdit?.title || '',
        description: taskToEdit?.description || '',
        category: taskToEdit?.category || 'General',
        priority: taskToEdit?.priority || 'medium',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (taskToEdit) {
            dispatch(updateTask({ id: taskToEdit.id, updates: formData }));
        } else {
            dispatch(addTask(formData));
        }

        // Reset form
        setFormData({
            title: '',
            description: '',
            category: 'General',
            priority: 'medium',
        });
        setErrors({});

        if (onCancel) {
            onCancel();
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} aria-label="Task form">
            <div className={styles.formGroup}>
                <label htmlFor="title" className={styles.label}>
                    Task Title <span className={styles.required}>*</span>
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                    placeholder="Enter task title..."
                    aria-required="true"
                    aria-invalid={!!errors.title}
                    aria-describedby={errors.title ? 'title-error' : undefined}
                />
                {errors.title && (
                    <span id="title-error" className={styles.error} role="alert">
                        {errors.title}
                    </span>
                )}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="Add task description..."
                    rows="3"
                />
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="category" className={styles.label}>
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="General">General</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Health">Health</option>
                        <option value="Finance">Finance</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="priority" className={styles.label}>
                        Priority
                    </label>
                    <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>

            <div className={styles.formActions}>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className={styles.btnSecondary}
                        aria-label="Cancel editing"
                    >
                        Cancel
                    </button>
                )}
                <button type="submit" className={styles.btnPrimary} aria-label={taskToEdit ? 'Update task' : 'Add task'}>
                    {taskToEdit ? 'Update Task' : 'Add Task'}
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
