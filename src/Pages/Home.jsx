import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import Left from "../LeftSidebar/Left";
import Right from "../RightSidebar/Right";
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Main from '../components/Main';

function Home(){
    return(
<div className='w-full'>
    <div className="fixed top-0 z-10 w-full bg-white">
        
<Navbar></Navbar>
        </div> 

<div className='flex bg-gray-100 '>
<div className='flex auto w-[20%] fixed top-12'>
    <Left>

    </Left>
</div>
<div className="flex-auto bg-white-100 w-[60%] absolute left-[20%] top-14 rounded-xl">
    <div className="w-[80%] mx-auto">


<CardSection></CardSection>
<Main></Main>
    </div>
</div>

<div className='flex auto w-[20%]  right-0 fixed top-12'>
    <Right>

    </Right>
</div>
</div>
</div>


    )
}
export default Home;