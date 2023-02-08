import Head from 'next/head';
import { useEffect } from 'react';
import { mutate } from 'swr';
import Board from '../../../components/Board/Board';
import TaskDetails from '../../../components/Modals/TaskDetails';
import useModal from '../../../hooks/useModal';
import { useBoardsContext } from '../../../store/BoardListContext';

export default function BoardPage() {
    const { selectedBoard, selectedTask, setSelectedTask } = useBoardsContext();
    const taskDetailsModal = useModal();
    const Modal = taskDetailsModal.Component;

    useEffect(() => {
        if (selectedTask) {
            taskDetailsModal.open();
        }
    }, [selectedTask]);

    useEffect(() => {
        if (selectedBoard && !taskDetailsModal.isOpen) {
            setSelectedTask(null);
            mutate(`/api/boards/${selectedBoard.uuid}`);
        }
    }, [taskDetailsModal.isOpen]);

    return (
        <>
            <Head>
                <title>{`Kanban - ${selectedBoard?.name}`}</title>
                <meta name="description" content={`Task management web app`} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <main className="text-bold h-full flex-col overflow-scroll p-6 text-center font-jakarta text-lg text-mid-grey dark:text-white">
                {selectedBoard && <Board boardUUID={selectedBoard.uuid} />}
                <Modal>
                    {selectedBoard && selectedTask && (
                        <TaskDetails
                            closeModal={taskDetailsModal.close}
                            taskUUID={selectedTask}
                            columns={selectedBoard.columns}
                        />
                    )}
                </Modal>
            </main>
        </>
    );
}
