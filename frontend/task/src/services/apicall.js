import axios from 'axios'

function getAuthHeaders(){
    let t= localStorage.getItem('Token')
    return {'Authorization': 'token '+t}
}

export async function registeruser(data){
    return await axios.post("http://127.0.0.1:8000/register/",data)
}

export async function loginuser(data){
    return await axios.post("http://127.0.0.1:8000/login/",data)
}

export async function create(data){
    return await axios.post("http://127.0.0.1:8000/",data,{headers : getAuthHeaders()})
}
export async function alltask(){
    return await axios.get("http://127.0.0.1:8000/",{headers : getAuthHeaders()})
}
// export async function logouttuser(data){
//     return await axios.post("http://127.0.0.1:8000/logout/",data)
// }

export async function deletetask(id){
    return await axios.delete(`http://127.0.0.1:8000/tasks/${id}/`,{headers : getAuthHeaders()})
}
export async function detailtask(id){
    return await axios.get(`http://127.0.0.1:8000/details/${id}/`,{headers : getAuthHeaders()})
}

export async function edittask(id,data){
    return await axios.put(`http://127.0.0.1:8000/details/${id}/`,data,{headers : getAuthHeaders()})
}

export async function searchdetail(params) {
    let p={'title':params.title,'status':params.status,'priority':params.priority}
    return await axios.get("http://127.0.0.1:8000/search/",{params:p,headers:getAuthHeaders()})
}