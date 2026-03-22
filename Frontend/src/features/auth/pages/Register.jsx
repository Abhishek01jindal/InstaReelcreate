import React from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import '../styles/form.scss'
import {useAuth} from '../hooks/useAuth'
import {useNavigate} from 'react-router'

const Register = () => {
    const {loading,handleRegister} = useAuth()
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
      await handleRegister(username, email, password)
      navigate('/')
       
    }  
    if(loading){
        return (
        <main>
            <h1>Loading...</h1>
        </main>
    )
    } 

  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input onInput={(e)=>{setUsername(e.target.value)}} type="text" name='username' placeholder='Enter Username' />
                <input onInput={(e)=>{setEmail(e.target.value)}} type="email" name='email' placeholder='Enter Email' />
                <input onInput={(e)=>{setPassword(e.target.value)}} type="password" name='password' placeholder='Enter Password' />
                <button className='button primary-button' type='submit'>Register</button>
            </form>
            <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
        </div>
    </main>
  )
}

export default Register