import { useEffect } from 'react'
import {  detailtask, edittask} from '../services/apicall'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Edit() {
    const [task,settask] = useState({title:"",description:"",status:"",priority:"",due_at:""})
    const navigate = useNavigate()
    const {search} = useLocation()
    const queryParams= new URLSearchParams(search)
    const id=queryParams.get('id')
     async function fetchTask() {
          let res = await detailtask(id)
          console.log(res)
          if(res.status===200){
            settask(res.data)
          }
          else{
            alert('not found')
          }
        } 
    async function updatetask(event){
        event.preventDefault()
        let res=await edittask(id,task)
        if(res.status===200){
            navigate('/tasks')
        }
        else{
            alert("not updated")
        }

    }
useEffect(()=>{fetchTask()},[])
  return (
    <div className="container w-50 border border-2 p-4 mt-3 bg-primary">
      <h2 className="text-center">Update Task</h2>
      <form className="mt-3" onSubmit={updatetask}>
        <div className="mb-3">
          <input className="form-control" placeholder="Title" value={task.title}
                 onChange={event=>settask({...task, title:event.target.value})}/>
        </div>
        <div className="mb-3">
          <textarea className="form-control" placeholder="Description" value={task.description}
                    onChange={event=>settask({...task, description:event.target.value})}/>
        </div>
        <div className="mb-3">
          <label  className="text-white"></label>
          <select className="form-select"  value={task.status}
                 onChange={event=>settask({...task, status:event.target.value})}>
                <option value='pending'>pending</option>
                <option value='in progress'>in progress</option>
                <option value='completed'>completed</option> 
          </select>
        </div>
        <div className="mb-3">
          <label  className="text-white"></label>
          <select className="form-select"  value={task.priority}
                 onChange={event=>settask({...task, priority:event.target.value})}>
                <option value='low'>low</option>
                <option value='medium'>medium</option>
                <option value='high'>high</option>
          </select>
        </div>
          <div className="mb-3">
          <input className="form-control" placeholder="Due Date" value={task.due_at}
                 onChange={event=>settask({...task, due_at:event.target.value})}/>
        </div>
       
        <button type="submit" className="btn btn-primary w-100">add </button>
      </form>
    </div>
  )
}

export default Edit
