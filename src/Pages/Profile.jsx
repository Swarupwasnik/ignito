import React, { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import Left from "../LeftSidebar/Left";
import Right from "../RightSidebar/Right";
import Card from "../components/Card";
// import CardSection from '../components/CardSection';
import Main from "../components/Main";
import eno from "../assets/Images/eno.jpg";
import { Avatar } from "@material-tailwind/react";
import man from "../assets/Images/man.jpg";
import {
  collection,
 where,
  onSnapshot,
 query
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [profile, setprofile] = useState(null);

  useEffect(()=>{
const getUserProfile=async()=>{
    const q=query(collection(db,"user"))
   .where("uid","==",id)
   await onSnapshot(q,(doc)=>{
    setprofile(doc.docs[0].data())
   })
}
getUserProfile();
  },[id]);

  return (
    <div className="w-full">
      <div className="fixed top-0 z-10 w-full bg-white">
        <Navbar></Navbar>
      </div>

      <div className="flex bg-gray-100 ">
        <div className="flex auto w-[20%] fixed top-12">
          <Left></Left>
          
        </div>
        <div className="flex-auto bg-white-100 w-[60%] absolute left-[20%] top-14 rounded-xl">
          <div className="w-[80%] mx-auto">
            <div className="relative py-4 ">
              <img className="h-96 w-full rounded-md" src={eno} alt="profile" />
            </div>
            <div className="absolute bottom-10 left-20">
              <Avatar
                variant="circular"
                size="xl"
                src={profile?.large || eno}
                alt="man"
              ></Avatar>
              <p className="py-2 font-Open_Sans font-medium no-underline tracking-normal text-white landing-none">
                {profile?.email}
              </p>
              <p className="py-2 font-Open_Sans font-medium no-underline tracking-normal text-white landing-none">
                {profile?.name}
              </p>
            </div>

            <Main></Main>
          </div>
        </div>
        <div className="flex flex-col absolute right-6 bottom-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>

          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>

            <span className="ml-2 py-2 font-Open_Sans font-medium no-underline tracking-normal text-white landing-none">
              India
            </span>
          </div>
          <div className="flex item-center"></div>
        </div>
        <div className="flex auto w-[20%]  right-0 fixed top-12">
          <Right></Right>
        </div>
      </div>
    </div>
  );
};

export default Profile;
