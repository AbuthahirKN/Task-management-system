import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { create } from '../services/apicall';

function AddTask() {
    const navigate = useNavigate();
    const[data,setdata]=useState({title:"",description:"",status:"",due_at:"",});
    async function addtask(event){
        event.preventDefault();
        let res= await create(data)
        console.log(data)
        if(res.status===201 || res.res.status){
          navigate('/tasks')
        }
        else{
          alert("task not added")
        }
    }
  return (
    <div className="container w-50 border border-2 p-4 mt-3 bg-primary">
      <h2 className="text-center">Add Task</h2>
      <form className="mt-3" onSubmit={addtask}>
        <div className="mb-3">
          <input className="form-control" placeholder="Title"
                 onChange={event=>setdata({...data, title:event.target.value})}/>
        </div>
        <div className="mb-3">
          <textarea className="form-control" placeholder="Description"
                    onChange={event=>setdata({...data, description:event.target.value})}/>
        </div>
        <div className="mb-3">
          <input className="form-control" placeholder="Status"
                 onChange={event=>setdata({...data, status:event.target.value})}/>
        </div>
        <div className="mb-3">
          <input className="form-control" placeholder="Due_date"
                 onChange={event=>setdata({...data, due_at:event.target.value})}/>
        </div>
       
        <button type="submit" className="btn btn-success w-100">Add </button>
      </form>
    </div>
  )
}
export default AddTask