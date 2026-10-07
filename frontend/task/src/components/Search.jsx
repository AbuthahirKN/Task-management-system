import React, { useEffect, useState } from 'react'
import { searchdetail } from '../services/apicall'
import { useLocation } from 'react-router-dom'
 

function Search() {
  const {search}=useState('')
  const location = useLocation()
    // console.log(search)
const [task,settasks]=useState([])
   const queryParams=new URLSearchParams(search)
   const word=queryParams.get('w')
   async function searchbooks(){
    console.log('search')
    let res=await searchdetail(word)
    console.log(res.data)
     settasks(res.data)

   }
    useEffect(()=>{searchtasks()},[])
  return (
   <div>
      <div className="container border border-2 mt-4 p-4 mb-3 shadow">
        <h3 className="text-center text-primary mt-3 mb-3">
          Search results
        </h3>
        {Array.isArray(task)?
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>pages</th>
              <th>Languges</th>
              <th>Price</th>
              
            </tr>
          </thead>
          <tbody>
            {task.map((i)=><tr>
              
              <td>{i.title}</td>
              <td>{i.description}</td>
              <td>{i.created_at}</td>
              <td>{i.due_at}</td>
              <td>{i.status}</td>
             
            </tr>)}
            </tbody>
          
        </table>:
        <div> No results</div>}
      </div>
    </div>
  )
}
  
export default Search
