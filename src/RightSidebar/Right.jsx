// import React, { useContext, useState } from "react";
// import India from "../assets/Images/India.jpg";
// import { AuthContext } from "../context/WebContext";
// import dustbin from "../assets/Images/dustbin.png";
// import { Link } from "react-router-dom";
// import man from "../assets/Images/man.jpg";
// import { Avatar } from "@material-tailwind/react";
// import { collection,where ,setDoc,doc,serverTimestamp, orderBy, query, onSnapshot, getDocs, updateDoc, arrayRemove } from "firebase/firestore";
// import { db } from "../firebase/firebase";

// function Right() {
//   const [input, setinput] = useState([]);
//   const { user, userData } = useContext(AuthContext);
//   const friendList = userData?.friend;

//   const serachFriends = (data) => {
//     return data.filter((item) => {
//       item["name"].toLowerCase().includes(input.toLowerCase());
//     });
//   };


//   const removeFriend=async(id,name,image)=>{
// const q=query(collection(db,'user').where("uid" ,"==" , user?.uid));
// const getDoc=await getDocs(q);
// const userDcoumentId=getDoc.docs[0].id;

// await updateDoc(doc(db,'user',userDcoumentId),{
//   friends:arrayRemove({id:id,name:name,image:image})
// })
//   }
//   return (
//     <div className="flex flex-col h-screen bg-white shadow-lg border-2 rounded-1-xl">
//       <div className="flex flex-col item-center relative pt-10">
//         <img src={India} alt="Flag" />
//       </div>
//       <p className="font-Open_Sans font-normal  text-sm text-gray-700 max-w-fit no-underline tracking-normal leading-tight py-2 mz-2">
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit aut magni
//         consequuntur unde quae quis voluptatem fugiat illum ex. Pariatur eum
//         dicta delectus sapiente corrupti soluta, debitis molestias ab maiores.
//       </p>

//       <div className="mx-2 mt-10">
//         <p className="font-Open_Sans font-medium text-sm text-gray-700 tracking-normal no-underline  leading-none">
//           Friends:{" "}
//         </p>

//         <input
//           type="text"
//           name="input"
//           className="border-0 outline-none mt-4"
//           onChange={(e) => setinput(e.target.value)}
//           value={input}
//           placeholder="Search Friend"
//         />
//         {friendList.length > 0
//           ? serachFriends(friendList)?.map((friend) => {
//               return (
//                 <div
//                   className="flex items-center justify-between hover:bg-blue-gray-100 ease-in-out"
//                   key={friend.id}
//                 >
//                   <Link to="">
//                     <div className="flex items-center my-2 cursor-pointer">
//                       <div className="flex items-center">
//                         <Avatar
//                           varient="circular"
//                           alt="avatar"
//                           size="sm"
//                           src={friend?.image || man}
//                         ></Avatar>
//                         <p className="ml-4 font-extrabold font-medium text-sm text-red-600 no-underline tracking-normal leading-none">
//                           {friend.name}
//                         </p>
//                       </div>
//                     </div>
//                   </Link>
//                   <div className="mr-4">
//                     <img onClick={removeFriend(friend.id,friend.name)}
//                      className="cursor-pointer" src={dustbin} alt="deleteFriend" />
//                   </div>
//                 </div>
//               );
//             })
//           : <p className="mt-10 font-Open_Sans font-medium text-sm text-gray-300 no-underline tracking-normal leading-none">
//             Add Frined 
//           </p> }
//       </div>
//     </div>
//   );
// }

// export default Right;

import React, { useContext, useState } from "react";
import India from "../assets/Images/India.jpg";
import { AuthContext } from "../context/WebContext";
import dustbin from "../assets/Images/dustbin.png";
import { Link } from "react-router-dom";
import man from "../assets/Images/man.jpg";
import { Avatar } from "@material-tailwind/react";
import {
  collection,
  where,
  setDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
  onSnapshot,
  getDocs,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

function Right() {
  const [input, setinput] = useState([]);
  const { user, userData } = useContext(AuthContext);
  const friendList = userData?.friend;

  const serachFriends = (data) => {
    return data.filter((item) => {
      return item["name"].toLowerCase().includes(input.toLowerCase());
    });
  };

  const removeFriend = async (id, name, image) => {
    const q = query(collection(db, "user").where("uid", "==", user?.uid));
    const getDoc = await getDocs(q);
    const userDcoumentId = getDoc.docs[0].id;

    await updateDoc(doc(db, "user", userDcoumentId), {
      friends: arrayRemove({ id: id, name: name, image: image }),
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white shadow-lg border-2 rounded-1-xl">
      <div className="flex flex-col item-center relative pt-10">
        <img src={India} alt="Flag" />
      </div>
      <p className="font-Open_Sans font-normal text-sm text-gray-700 max-w-fit no-underline tracking-normal leading-tight py-2 mz-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit aut magni
        consequuntur unde quae quis voluptatem fugiat illum ex. Pariatur eum
        dicta delectus sapiente corrupti soluta, debitis molestias ab maiores.
      </p>

      <div className="mx-2 mt-10">
        <p className="font-Open_Sans font-medium text-sm text-gray-700 tracking-normal no-underline leading-none">
          Friends:{" "}
        </p>

        <input
          type="text"
          name="input"
          className="border-0 outline-none mt-4"
          onChange={(e) => setinput(e.target.value)}
          value={input}
          placeholder="Search Friend"
        />
        {friendList && friendList.length > 0 ? (
          serachFriends(friendList)?.map((friend) => {
            return (
              <div
                className="flex items-center justify-between hover:bg-blue-gray-100 ease-in-out"
                key={friend.id}
              >
                <Link to={`/profile/${friend.id}`}>
                  <div className="flex items-center my-2 cursor-pointer">
                    <div className="flex items-center">
                      <Avatar
                        variant="circular"
                        alt="avatar"
                        size="sm"
                        src={friend?.image || man}
                      ></Avatar>
                      <p className="ml-4 font-extrabold  text-sm text-red-600 no-underline tracking-normal leading-none">
                        {friend.name}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="mr-4">
                  <img
                    onClick={() => removeFriend(friend.id, friend.name)}
                    className="cursor-pointer"
                    src={dustbin}
                    alt="deleteFriend"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="mt-10 font-Open_Sans font-bold text-sm text-gray-700 no-underline tracking-normal leading-none">
            Add Friend
          </p>
        )}
      </div>
    </div>
  );
}

export default Right;
