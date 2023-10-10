import React from 'react'
import Home from './Home';
import { Routes,Route } from 'react-router-dom';
import  LoginCard  from './Login';
import Register from "./Register";
import Forgot from './Forgot';
import Profile from './Profile';


function Pages() {
  return (
    <div>
      <Routes>
<Route path='/' element={<Home></Home>}></Route>
<Route path="/login" element={<LoginCard></LoginCard>} ></Route>
<Route path="/register" element={<Register></Register>} ></Route>
<Route path='/reset' element={<Forgot>/</Forgot>}></Route>
<Route path='/profile/:id' element={<Profile>/</Profile>}></Route>

      </Routes>
    </div>
  )
}

export default Pages
