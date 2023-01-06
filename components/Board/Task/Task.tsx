import { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Task: FC<{ title: string; subtasksDone: number; subtasksTotal: number }> = (props) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.title });

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              transition,
          }
        : undefined;

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => console.log(`Clicked task ${props.title}`)}
            className="group mb-5 cursor-pointer rounded-md bg-dark-grey px-4 py-6 text-left font-bold"
        >
            <h4 className="text-sm group-hover:text-primary">{props.title}</h4>
            {props.subtasksTotal > 0 && (
                <span className="mt-2 text-xs text-mid-grey">{`${props.subtasksDone} of ${props.subtasksTotal} subtasks done`}</span>
            )}
        </li>
    );
};

export default Task;
