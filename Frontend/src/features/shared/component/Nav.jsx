import React from 'react'
import { useNavigate } from 'react-router'
import '../nav.scss'

const Nav = () => {
  const navigate = useNavigate()
  return (
    <nav className='nav-bar'>
       <p>Insta</p>
       <button 
       onClick={()=>{navigate('/create-post')}}
       className='button primary-button'>new post</button>
    </nav>
  )
}

export default Nav
