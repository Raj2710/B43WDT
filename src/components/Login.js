import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import {url} from '../App'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

function Login() {
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  let navigate = useNavigate()

  useEffect(()=>{
    sessionStorage.clear()
  },[])

  let handleLogin =async()=>{
    let payload = {email,password}
    try {
      let res = await axios.post(`${url}/users/login`,payload)
      toast.success(res.data.message)
      sessionStorage.setItem('token',res.data.token)
      navigate('/dashboard')

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return <>
    <div className='login-wrapper'>
      <h1 style={{"textAlign":"center"}}>Login Here!</h1>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
     
      <Button variant="primary" onClick={()=>handleLogin()}>
        Submit
      </Button>
    </Form>
    </div>
  </>
}

export default Login;