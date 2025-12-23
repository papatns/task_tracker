import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { reorderTasks } from '../../features/tasks/tasksSlice';
import { selectFilteredTasks } from '../../features/tasks/tasksSelectors';
import TaskItem from '../TaskItem';
import styles from './TaskList.module.css';

const TaskList = () => {
    const dispatch = useDispatch();
    const filteredTasks = useSelector(selectFilteredTasks);

    const handleDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        dispatch(
            reorderTasks({
                sourceIndex: result.source.index,
                destinationIndex: result.destination.index,
            })
        );
    };

    if (filteredTasks.length === 0) {
        return (
            <div className={styles.emptyState} role="status">
                <div className={styles.emptyIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11l3 3L22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                </div>
                <h3 className={styles.emptyTitle}>No tasks found</h3>
                <p className={styles.emptyDescription}>
                    Create a new task to get started or adjust your filters
                </p>
            </div>
        );
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasks">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`${styles.taskList} ${snapshot.isDraggingOver ? styles.draggingOver : ''}`}
                        role="list"
                        aria-label="Task list"
                    >
                        {filteredTasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided, snapshot) => (
                                    <div role="listitem">
                                        <TaskItem task={task} provided={provided} snapshot={snapshot} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default TaskList;
