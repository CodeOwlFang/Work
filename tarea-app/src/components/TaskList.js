
import '../styles/App.css';
import '../styles/Task.css';
import React, { useState } from 'react';
import Task from './Task';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isAscendingOrder, setIsAscendingOrder] = useState(true);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleSortTasks = () => {
    const sortedTasks = [...tasks];
    if (isAscendingOrder) {
      sortedTasks.sort();
    } else {
      sortedTasks.sort().reverse();
    }
    setTasks(sortedTasks);
    setIsAscendingOrder(!isAscendingOrder);
  };

  const handleDeleteTask = (index) => {
    const confirmed = window.confirm('¿Quieres borrar esta tarea?');
    if (confirmed) {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
    }
  };

  const handleDragStart = (e, taskIndex) => {
    e.dataTransfer.setData('text/plain', taskIndex.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    const draggingIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (draggingIndex !== dropIndex) {
      const updatedTasks = [...tasks];
      const [draggedTask] = updatedTasks.splice(draggingIndex, 1);
      updatedTasks.splice(dropIndex, 0, draggedTask);
      setTasks(updatedTasks);
    }
  };

  const sortButtonText = isAscendingOrder ? 'Ordenar descendente' : 'Ordenar ascendente';

  return (
    <div className="caja">
      <h1>Lista de Tareas</h1>
      <div>
        <Task onAddTask={handleAddTask} />
        <button id="sortButton" onClick={handleSortTasks}>
          <img src="/images/A_Z.png" alt={sortButtonText} height="25px" />
        </button>
        <div id="taskList" style={{ marginBottom: '20px' }}>
          {tasks.map((task, index) => (
            <div
              key={index}
              className="task"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <span className="task-text">{task}</span>
              <button className="delete-button" onClick={() => handleDeleteTask(index)}>
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
