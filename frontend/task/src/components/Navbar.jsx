import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Navbar() {
  const [word,setword]= useState('')
  const navigate=useNavigate()
  function searchdetail(event){
    event.preventDefault()
    const searchword=word.trim()
    if(!searchword){
      return
    }
    navigate(`/search?title=${encodeURIComponent(searchword)}`)
    
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand " href="#" ><b>TASK MANAGER</b></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
       <li class="nav-item"><Link class="nav-link" to="/">Home</Link></li>

        <li class="nav-item"><Link class="nav-link" to="/register">Register</Link>
          
        </li>
         <li class="nav-item"><Link class="nav-link" to="/login"> Login</Link>
         
        </li>
         <li class="nav-item"><Link class="nav-link" to="addtask">AddTask</Link>
        
        </li>

        <li class="nav-item"><Link class="nav-link" to="/tasks"> Tasks</Link>
        </li>
        <li class="nav-item"><Link class="nav-link" to="/edit"> edit</Link>
        </li>
    
       
      </ul>
      <form class="d-flex" onSubmit={searchdetail}>
        <input class="form-control me-2" type="search" value={word}  onChange={(event)=>{setword(event.target.value)}} placeholder="Search" aria-label="Search"></input>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
