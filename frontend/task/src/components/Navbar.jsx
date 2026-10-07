import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
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
       <li class="nav-item"><Link to="/"><a class="nav-link" href="#">Home</a></Link></li>

        <li class="nav-item"><Link to="/register"><a class="nav-link" href="#">Register</a></Link>
          
        </li>
         <li class="nav-item"><Link to="/login"> <a class="nav-link" href="#">Login</a></Link>
         
        </li>
         <li class="nav-item"><Link to="addtask"><a class="nav-link" href="#">AddTask</a></Link>
        
        </li>

        <li class="nav-item"><Link to="/tasks"> <a class="nav-link" href="#">Tasks</a></Link>
        </li>
        <li class="nav-item"><Link to="/edit"> <a class="nav-link" href="#">edit</a></Link>
        </li>
    
       
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
