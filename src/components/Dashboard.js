import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Table from 'react-bootstrap/Table';
import {url} from '../App'
import axios from 'axios'
import Button from 'react-bootstrap/esm/Button';

function Dashboard() {
  let [data,setData] = useState([])
  let token = sessionStorage.getItem('token')
  let navigate = useNavigate()

  let logout = ()=>{
      sessionStorage.clear()
      navigate('/login')
  }

  let getData = async()=>{
    try {
      let res = await axios.get(`${url}/users`,{
        headers:{Authorization:`Bearer ${token}`}
      })
      toast.success(res.data.message)
      setData(res.data.users)
    } catch (error) {
      if(error.response.status === 401 || error.response.status===400)
      {
        toast.error(error.response.data.message)
        logout()
      }
    }
  }
  useEffect(()=>{
    if(token)
      getData(); 
    else
      logout()
  },[])
  return <>
    <Button onClick={()=>getData()}>Refresh</Button>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((e,i)=>{
            return <tr key={e._id}>
                <td>{i+1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.mobile}</td>
                <td>{e.role}</td>

            </tr>
          })
        }
      </tbody>
    </Table>
  </>
}

export default Dashboard