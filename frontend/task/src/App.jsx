import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom' 
import Register from './components/Register'
import Login from './components/Login'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'
import Edit from './components/Edit'
import Navbar from './components/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>

     <Navbar/>
     <h1>Task Manager</h1>   
     
     <Routes>
      {/* <Route path ='/' element={<Home/>}></Route> */}
      <Route path ='/register' element={<Register/>}></Route>
      <Route path ='/login' element={<Login/>}></Route>
      <Route path ='/addtask' element={<AddTask/>}></Route>
      <Route path='/tasks' element={<TaskList/>}></Route>
      <Route path='/edit' element={<Edit/>}></Route>
     </Routes>
  
    
     </BrowserRouter>
      
    </>
  )
}

export default App
