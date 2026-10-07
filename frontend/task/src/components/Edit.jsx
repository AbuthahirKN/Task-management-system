import { useEffect } from 'react'
import {  detailtask, edittask} from '../services/apicall'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Edit() {
    const [task,settask] = useState({name:"",description:""})
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
          <input className="form-control" placeholder="Title" value={task.name}
                 onChange={event=>settask({...task, name:event.target.value})}/>
        </div>
        <div className="mb-3">
          <textarea className="form-control" placeholder="Description" value={task.description}
                    onChange={event=>settask({...task, description:event.target.value})}/>
        </div>
       
        <button type="submit" className="btn btn-primary w-100">add </button>
      </form>
    </div>
  )
}

export default Edit
