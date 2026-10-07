import React, { useState } from 'react'
import { registeruser } from '../services/apicall'
import {useNavigate} from 'react-router-dom'

function Register() {
    const navigate = useNavigate();
    const[data,setdata] = useState({username:"",email:"",password:""});
   async function register(event){
        event.preventDefault()
        let r= await registeruser(data)
  console.log(r.data)
        if(r.status ===200){
           console.log(r.data)
          navigate('/login');
        }
        else{
          alert('not Registerd')
        }
    }
    
  return (
  
     <div className="container w-50 border border-2 p-4 mt-3 bg-primary">
      <h2 className="text-center">Register</h2>
      <form className="mt-3" onSubmit={register} >
        <div className="mb-3">
          <input className="form-control" placeholder="Username"
            onChange={(event)=>{setdata({...data,'username':event.target.value})}}    />
        </div>
        <div className="mb-3">
          <input className="form-control" placeholder="Password" onChange={(event)=>{setdata({...data,'password':event.target.value})}}
               type="password"     />
        </div>
        <div className="mb-3">
          <input className="form-control" placeholder="Email" type="email"
            onChange={(event)=>{setdata({...data,'email':event.target.value})}}    />
        </div>
       
        <button type="submit" className="btn btn-success w-100">register </button>
      </form>
    </div>
  )
}

export default Register
