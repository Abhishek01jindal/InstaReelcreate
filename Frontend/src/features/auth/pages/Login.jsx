import React,{useState} from 'react'
import { Link } from 'react-router'
import '../styles/form.scss'
import {useAuth} from '../hooks/useAuth'
import {useNavigate} from 'react-router'

const Login = () => {

const [username, setUsername] = React.useState('')
const [password, setPassword] = React.useState('')

const {handleLogin, loading} = useAuth()
const navigate = useNavigate()

if(loading){
    return (
    <h1>Loading...</h1>
)
}

async function handleSubmit(e){
    e.preventDefault()
    handleLogin(username, password)
    .then((res)=>{
        console.log(res)
        navigate('/')
    })
   
}

  return (
   <main>
    <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input onInput={(e)=>{setUsername(e.target.value)}} type="text" name='username' placeholder='Enter Username' />
            <input onInput={(e)=>{setPassword(e.target.value)}} type="password" name='password' placeholder='Enter Password' />
            <button className='button primary-button' type='submit'>Login</button>
        </form>
        <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
    </div>
   </main>
  )
}

export default Login
