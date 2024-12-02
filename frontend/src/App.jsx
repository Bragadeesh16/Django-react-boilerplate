import { useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { Navigate,BrowserRouter,Route,Routes } from 'react-router-dom'
import Notfound from './pages/NotFound'


function logout(){
  localStorage.clear()
  return <Navigate to='/login'/>
}

function RegisterandLogout(){
  localStorage.clear()
  return < Register/>
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>

    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/Register' element = {<Register/>}/>
      <Route path='*' element = {<Notfound/>}/>
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default {App,logout}
