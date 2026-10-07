import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginuser } from '../services/apicall';

function Login() {
  const [data,setdata] =useState({username:"",password:""});
  const navigate = useNavigate()
  async function login(event){
    event.preventDefault();
    let r= await loginuser(data);
    if(r.status===200){
    let t=r.data.token
      localStorage.setItem('Token',t);
      
        navigate('/tasks')
      
    }
    else{
      alert('invalid credentials')
    }
  }
  return (
   <div className="container w-50 border border-2 p-4 mt-3 bg-primary">
      <h2 className="text-center">Login</h2>
      <form className="mt-3"onSubmit={login} >
        <div className="mb-3">
          <input className="form-control" placeholder="Username"
            onChange={(event)=>{setdata({...data,'username':event.target.value})}}    />
        </div>
        <div className="mb-3">
          <input className="form-control" placeholder="Password" type="password" onChange={(event)=>{setdata({...data,'password':event.target.value})}}
                    />
        </div>
       
        <button type="submit" className="btn btn-success w-100">Login </button>
      </form>
    </div>

  )
}

export default Login
