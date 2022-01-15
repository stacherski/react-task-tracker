import React from "react";
import { useState, useEffect } from "react"
import Header from "./components/Header";
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask";


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])


//fetchTasks
const fetchTasks = async () => {
  const res = await fetch('http://localhost:4000/tasks')
  const data = await res.json()
  
  return data
}

//fetchTask
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:4000/tasks/${id}`)
  const data = await res.json()
  
  return data
}

//AddTask
const addTask = async (task) => {
  const res = await fetch('http://localhost:4000/tasks',{
    method: 'POST',
    headers:{
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json()

  setTasks([...tasks, data])
  // const id = Math.floor(Math.random() *10000)+1
  // const newTask = {id, ...task}
  // setTasks([...tasks, newTask])
}

//Toggle Reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}
  const res = await fetch(`http://localhost:4000/tasks/${id}`,{
  method: 'PUT',
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify(updateTask)
})
  const data = await res.json()

  setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
}
//Delete task
const deleteTask = async (id) => {
  await fetch(`http://localhost:4000/tasks/${id}`, {
    method: 'DELETE'
  })
  setTasks(tasks.filter((task) => task.id !== id))
}

  return (
    <div className="container">
      <Header title='React task tracker' onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No tasks'}
    </div>
  );
}

export default App