import { useEffect, useState } from 'react';

export function ToDoList() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [input, setInput] = useState('');
    const [tasklist, setTasklist] = useState(() => {
        const storedTasks = localStorage.getItem('toDoTasks');
        return storedTasks? JSON.parse(storedTasks) : [];
    })

    class Task {
        constructor(task) {
            this.task = task;
        }
    }

    function showAddTaskMenu() {
        setIsMenuVisible(true);
        header.style.opacity = '.3' 
    }

    function addNewTask() {
        if (input === '') {
            alert('Для кого я поле ввода сделал?');
            return
        }

        const newTask = new Task(input);
        setTasklist([...tasklist,newTask]);
        setIsMenuVisible(false);
        setInput('');
        header.style.opacity = '1';
    }


    function deleteTask(indexToDelete) {
        const updatedTaskList = tasklist.filter((task, index) => index !== indexToDelete);
        setTasklist(updatedTaskList); 
    }

    useEffect(() => {
        localStorage.setItem('toDoTasks', JSON.stringify(tasklist))
    }, [tasklist])

    
    return (
        <div className = 'container'>
            <header>
            <h1>Список дел</h1>
            <button onClick={showAddTaskMenu} className='add'>Добавить задачу</button>
            </header>
            {isMenuVisible && (
                <div className="menu">
                      <h3>Введите название задачи</h3>
                      <input type="text" value={input} onChange={event => setInput(event.target.value)}/>
                      <button className="appendToDo" onClick={addNewTask}>Добавить</button>
                </div>
            )}
            <div className="result">
                {tasklist.map((taskElement, index) => (
                    <div key={index} className='task'><div className='taskLeft'>{taskElement.task}<input type='checkBox' id='check'/></div><button onClick={() => deleteTask(index)}><img src="public/trash-bin.png" height={50} width={50} /></button></div>
                ))}
            </div>
        </div>
    )
}

const header = document.querySelector('header');

