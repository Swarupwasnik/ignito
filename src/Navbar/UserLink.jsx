import React, { useContext } from 'react'
import { Tooltip, Border, avatar } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import man from "../assets/Images/man.jpg"
import { AuthContext } from '../context/WebContext';


const UserLink = () => {

  const {signOutUser,user,userData}=useContext(AuthContext);

  return (
    <div className="flex justify-center cursor-pointer">
      <div className='translate-y- duration-500 ease-in-out hover:text-blue-500'>
      <svg xmlns="http://www.w3.org/2000/svg" 
      fill="none" viewBox="0 0 24 24" 
      strokeWidth="1.5" stroke="currentColor" 
      className="w-6 h-6 mx-4">
   <path
   strokeLinecap="round" 
  strokeLinejoin="round"
   d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 mx-4 3 0 016 0z" />
</svg>
</div>

<div className='translate-y- duration-500 ease-in-out hover:text-blue-500'>
<svg xmlns="http://www.w3.org/2000/svg" 
fill="none" viewBox="0 0 24 24"
 strokeWidth="1.5" stroke="currentColor"
  className="w-6 h-6 mx-4">
  <path strokeLinecap="round" 
  strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 0 mx-406 9v.75a8.967 8.967 0 01-2.312 6.022 mx-4c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
</svg>

</div>

<div className=' flex mx-4 items-center' onClick={signOutUser}>
<Tooltip  content="Sign Out" placement="bottom">
  <Avatar src={user?.photoURL || avatar} size="sm" alt="avatar">

  </Avatar>
</Tooltip>
<p className="ml-4 font-bold font-Open_Sans text-sm  no-underline text-red">
{user?.displayName === null  && userData?.name !==undefined ? userData?.name?.charAt(0)?.toUpperCase() + userData?.name ?.slice(1):user?.displayName?.split("")[0] }
</p>
</div>
    </div>
  )
}

export default UserLink
