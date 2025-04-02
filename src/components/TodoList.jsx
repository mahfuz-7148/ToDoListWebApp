import  { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

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
        // toast.success('Task added successfully');
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
        // toast.success('Task deleted successfully');
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
        // toast.success('Task updated successfully');
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
        return true;
    });

    return (
        <div className="w-full min-h-screen bg-indigo-700 p-2.5 font-sans">

            <div className="w-full max-w-[540px] bg-white border-2 border-black mx-auto mt-24 mb-5 p-10 pb-16 rounded-2xl">
                <h2 className="flex items-center justify-center text-blue-600 mb-5">
                    <span className='text-4xl'>Todos List</span>

                </h2>

                <div className="flex items-center justify-between bg-[#edeef0] rounded-[30px] pl-5 mb-6">
                    <i className="fas fa-list-check text-gray-500"></i>
                    <input
                        type="text"
                        placeholder="Add your todo"
                        autoFocus
                        value={inputValue}
                        onChange={handleInputChange}
                        className="flex-1 border-none outline-none bg-transparent p-2.5"
                    />
                    <button
                        onClick={editTaskId ? handleUpdateTask : handleAddTask}
                        className="border-none outline-none p-4 px-12 bg-[#ff5945] text-white text-base cursor-pointer rounded-[40px]"
                    >
                        {editTaskId ? 'Update' : 'Add'}
                    </button>
                </div>

                <div className="flex text-xl ml-5 mb-7">
                    <i className="fas fa-check-double text-gray-500"></i>
                    <p onClick={handleCompleteAll} className="ml-2.5 cursor-pointer">Complete all tasks</p>
                    <p onClick={handleClearCompleted} className="ml-[90px] cursor-pointer">Delete comp tasks</p>
                </div>

                <ul className="m-0 p-0">
                    {filteredTasks.map((task) => (
                        <li
                            key={task.id}
                            className="p-2.5 flex justify-between items-center hover:bg-yellow-50"
                        >
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`task-${task.id}`}
                                    checked={task.completed}
                                    onChange={() => handleTaskCheckboxChange(task.id)}
                                    className="hidden"
                                />
                                <label
                                    htmlFor={`task-${task.id}`}
                                    className={`relative cursor-pointer before:content-[''] before:inline-block before:w-5 before:h-5 before:border-2 before:border-[#0079bf] before:mr-2.5 before:shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0px_-15px_10px_-12px_rgba(0,0,0,0.05)] ${
                                        task.completed ? 'line-through before:bg-[#0079bf]' : ''
                                    }`}
                                >
                                    {task.title}
                                    {task.completed && (
                                        <span className="absolute top-0.5 left-2.5 w-1.5 h-3.5 border-solid border-white border-r-2 border-b-2 rotate-45"></span>
                                    )}
                                </label>
                            </div>
                            <div className="flex items-center">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png"
                                    className="h-[25px] p-1 rounded mr-2.5 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleEditTask(task.id)}
                                />
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/3096/3096673.png"
                                    className="h-[25px] p-1 rounded hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleDeleteTask(task.id)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="mt-10 flex items-center">
                    <div className="relative inline-block group">
                        <button className="bg-[#4CAF50] text-white py-2.5 px-4 text-base border-none cursor-pointer rounded">
                            Filter
                        </button>
                        <div className="hidden group-hover:block absolute bg-[#f9f9f9] min-w-[160px] shadow-[0_8px_16px_rgba(0,0,0,0.2)] z-10 rounded">
                            <a href="#" onClick={() => handleFilterChange('all')} className="block p-3 text-black no-underline hover:bg-[#f1f1f1]">All</a>
                            <a href="#" onClick={() => handleFilterChange('uncompleted')} className="block p-3 text-black no-underline hover:bg-[#f1f1f1]">Uncompleted</a>
                            <a href="#" onClick={() => handleFilterChange('completed')} className="block p-3 text-black no-underline hover:bg-[#f1f1f1]">Completed</a>
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
        </div>
    );
};

export default TodoList;