import  { useState } from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all');
    const [editTaskId, setEditTaskId] = useState(null);
    const [nextId, setNextId] = useState(1);

    const handleInputChange = (event) => setInputValue(event.target.value);

    const handleAddTask = () => {
        if (inputValue.trim() === '') return;
        const newTask = { id: nextId, title: inputValue, completed: false };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setNextId(nextId + 1);
        setInputValue('');
        toast.success('Added task successfully', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Zoom,
        });
    };

    const handleTaskCheckboxChange = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };


    const handleDeleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        toast.warn('Deleted task successfully', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Zoom,
        });
    };

    const handleEditTask = (taskId) => {
        setEditTaskId(taskId);
        const taskToEdit = tasks.find((task) => task.id === taskId);
        setInputValue(taskToEdit.title);
    };

    const handleUpdateTask = () => {
        if (inputValue.trim() === '') return;
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === editTaskId ? { ...task, title: inputValue } : task
            )
        );
        setInputValue('');
        setEditTaskId(null);
        toast.success('Updated task successfully', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Zoom,
        });
    };

    const handleCompleteAll = () => {
        setTasks((prevTasks) => prevTasks.map((task) => ({ ...task, completed: true })));
    };

    const handleClearCompleted = () => {
        setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
    };

    const handleFilterChange = (filterType) => setFilter(filterType);

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') return true;
        if (filter === 'completed') return task.completed;
        if (filter === 'uncompleted') return !task.completed;
        return ;
    });

    return (
        <div className="w-full min-h-screen bg-indigo-700 p-5">

            <div className="w-full max-w-3xl bg-white border-2 border-black mx-auto mt-24 mb-5 p-10 pb-16 rounded-2xl">
                <h2 className="flex items-center justify-center text-blue-600 mb-5">
                    <span className='text-4xl'>Todos List</span>

                </h2>

                <div className="flex items-center justify-between bg-slate-200 rounded-2xl mb-6">

                    <input
                        type="text"
                        placeholder="Add your todo"
                        autoFocus
                        value={inputValue}
                        onChange={handleInputChange}
                        className="flex-1 border-none outline-none bg-transparent p-5"
                    />
                    <button
                        onClick={editTaskId ? handleUpdateTask : handleAddTask}
                        className="border-none outline-none py-5 text-xl px-12 bg-indigo-600 text-white cursor-pointer rounded-r-2xl">
                        {editTaskId ? 'Update' : 'Add'}
                    </button>
                </div>

                <div className="flex justify-between text-2xl ml-5 mb-7">
                    <p onClick={handleCompleteAll} className="cursor-pointer ">Complete all tasks</p>
                    <p onClick={handleClearCompleted} className="cursor-pointer">Delete completed tasks</p>
                </div>

                <ul>
                    {filteredTasks.map((task) => (
                        <li
                            key={task.id}
                            className="p-2 flex justify-between items-center hover:bg-yellow-50">
                            <div className="flex items-center text-2xl font-medium">
                                <input
                                    type="checkbox"
                                    id={`task-${task.id}`}
                                    checked={task.completed}
                                    onChange={() => handleTaskCheckboxChange(task.id)}
                                    className="w-5 h-5 m-2"
                                />
                                {task.title}

                            </div>
                            <div className="flex items-center">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png"
                                    className="h-6 p-1 rounded mr-3 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleEditTask(task.id)}
                                />
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/3096/3096673.png"
                                    className="h-6 p-1 rounded mr-3 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleDeleteTask(task.id)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="mt-10 flex items-center">
                    <div className="group">
                        <button className="bg-[#4CAF50] text-white py-2 px-4 text-base border-none cursor-pointer rounded">
                            Filter
                        </button>
                        <div className="hidden group-hover:block absolute bg-[#f9f9f9] min-w-[160px] rounded">
                            <a href="#" onClick={() => handleFilterChange('all')} className="block p-3 text-black hover:bg-[#f1f1f1]">All</a>
                            <a href="#" onClick={() => handleFilterChange('uncompleted')} className="block p-3 text-black hover:bg-[#f1f1f1]">Uncompleted</a>
                            <a href="#" onClick={() => handleFilterChange('completed')} className="block p-3 text-black hover:bg-[#f1f1f1]">Completed</a>
                        </div>
                    </div>

                    <div className="inline-block ml-[100px]">
                        <p>Completed: <span>{tasks.filter((task) => task.completed).length}</span></p>
                    </div>
                    <div className="inline-block ml-20">
                        <p className="text-sm text-gray-500">
                            Total Tasks: <span>{tasks.length}</span>
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="dark"
                transition={Zoom}
            />
        </div>
    );
};

export default TodoList;