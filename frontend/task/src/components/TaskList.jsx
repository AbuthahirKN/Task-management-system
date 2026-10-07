import React, { useState, useEffect } from "react";
import { alltask, deletetask } from "../services/apicall";
import { useNavigate } from "react-router-dom";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  async function fetchTask() {
      let res = await alltask()
      if(res.status===200){
        setTasks(res.data)
      }
    } 

  async function removeTask(id) {
      let res = await deletetask(id);
      console.log(res);
      if (res.status === 204) {
        fetchTask()
      } else {
        alert("Task not deleted");
      }


  }
  function update(id){
    navigate(`/edit?id=${id}`)

  }

  async function Completetask(task) {
    
     await toggletask(task.id, !task.completed)
    fetchTask() 
  }

  useEffect(() => {fetchTask();}, []);
  return (
    <div className=" container w-50 border border-2 p-4 mt-3 bg-primary">
      <h2 className="text-center">Tasks</h2>
      <button className="btn btn-warning " onClick={() => navigate("/addtask")}>Add Task</button>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} >
            <div>
            <h3 className="text-white">{task.name} </h3>
            <h4>{task.description}</h4> 
            <h4>{task.created}</h4>
            <p> {task.status}</p>
            <p> {task.priority}</p>
            <p> {task.due_date}</p>
            </div>
            <div className="btn btn-danger">
            <button className="btn btn-success"   onClick={() => Completetask(task)}>Toggle</button>
            <button className="btn btn-danger" onClick={() => removeTask(task.id)}>Delete</button>
            <button className="btn btn-warning " onClick={()=>update(task.id)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
