
import '../styles/Task.css';
import React, { useState } from 'react';

const Task = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleTaskInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddClick = () => {
    if (newTask.trim() !== '') {
      onAddTask(newTask);
      setNewTask('');
    }
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', newTask);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <input
        type="text"
        id="taskInput"
        placeholder="Nueva tarea"
        value={newTask}
        onChange={handleTaskInputChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleAddClick();
        }}
        draggable="true"
        onDragStart={handleDragStart}
      />
      <button id="addTaskButton" onClick={handleAddClick}>
        Agregar tarea
      </button>
    </div>
  );
};

export default Task;
