import React,{useState} from 'react'
import {Input,Button,Typography} from "@material-tailwind/react";


const Forgot = () => {

  const[email,setEmail]=useState("");
  return (
    <div className="grid grid-cols-1 justify-items-center items-center h-screen">
     <div className='w-96 '>
<Typography  
variant='h6' 
color='blue-gray'
className="pb-4">
Enter Email Adrress
</Typography>
<Input  name='email' onChange={(e)=>setEmail(e.target.value)} type='email' label="Email" value={email}>
</Input>
<Button variant='gardient' fullWidth className='mt-4'>Submit</Button>
     </div>


    </div>
  )
}

export default Forgot

