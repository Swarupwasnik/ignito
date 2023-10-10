import React, { useRef, useState, useEffect, useContext } from "react";
import eno from "../assets/Images/eno.jpg";
import { Tooltip, avatar } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import man from "../assets/Images/man.jpg";
import pc from "../assets/Images/pc.jpg";
import lol from "../assets/Images/lol.jpg";
import fb from "../assets/Images/fb.gif";
import twit from "../assets/Images/twit.png";
import yt from "../assets/Images/yt.png";
import link from "../assets/Images/link.png";
import build from "../assets/Images/build.jpg";
import gif1 from "../assets/Images/gif1.gif";
import gif2 from "../assets/Images/gif2.gif";
import burger from "../assets/Images/burger.gif";
import booking from "../assets/Images/booking.gif";
import kamrad from "../assets/Images/kamrad.gif";
import sale from "../assets/Images/sale.gif";
import { AuthContext } from "../context/WebContext";

const Left = () => {
  const [data, setData] = useState([]);
  const count = useRef(0);
  const { user, userData } = useContext(AuthContext);

  const handleRandom = (arr) => {
    setData(arr[Math.floor(Math.random() * arr?.length)]);
  };

  useEffect(() => {
    const imageList = [
      {
        id: "1",
        image: gif1,
      },
      {
        id: "2",
        image: gif2,
      },
      {
        id: "3",
        image: burger,
      },
      {
        id: "5",
        image: sale,
      },
      {
        id: "6",
        image: booking,
      },
      {
        id: "7",
        image: kamrad,
      },
    ];
    handleRandom(imageList);
    let countAds = 0;
    let startAds = setInterval(() => {
      countAds++;
      handleRandom(imageList);
      count.current = countAds;
      if (countAds === 7) {
        clearInterval(startAds);
      }
    }, 2000);
    return () => {
      clearInterval(startAds);
    };
  }, []);

  const progressBar = () => {
    switch (count.current) {
      case 1:
        return 15;

      case 2:
        return 30;

      case 2:
        return 30;

      case 3:
        return 45;

      case 4:
        return 60;

      case 5:
        return 75;

      case 6:
        return 90;

      case 7:
        return 100;

      default:
        return 0;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white pb-4 border-2 -r-xl shadow-lg">
      <div className="flex flex-col item-center relative">
        <img
          className="h-28 w-full rounded-r-xl"
          variant="square"
          src={eno}
          alt="nature"
        />
        <div className="absolute top-20 left-28 flex flex-row justify-center ">
          <Tooltip content="Profile" placement="top">
            <Avatar size="md" src={man} alt="avatar"></Avatar>
          </Tooltip>
        </div>
      </div>

      <div className="flex flex-col item-center pt-6">
        <p className="font-Open_Sans font-medium text-center text-md text-gray-700 no-underline tracking-normal leading-none">
          {user?.email || userData?.email || ""}
        </p>
        <p className="font-Open_Sans font-medium  text-center text-xs text-gray-700 no-underline tracking-normal leading-none">
          Access Exclusive tools & insights
        </p>
        <p className="font-Open_Sans font-medium text-center text-xs text-gray-700 no-underline tracking-normal leading-none py-2">
          Try Premium for free
        </p>
      </div>
      <div className="flex flex-col pl-2">
        <div className="flex items-center pb-4">
          <img className="h-5" src={pc} alt="pc" />
          <p className="font-Open_Sans font-bold text-cyan-300 text-sm no-underline tracking-normal landing-none ">
            React Developer
          </p>
        </div>
        <div className="flex items-center">
          <img className="h-5 flex items-center" src={lol} alt="lol" />
          <p className="font-Open_Sans font-bold text-cyan-300 text-sm no-underline tracking-normal landing-none ">
            India
          </p>
        </div>
        <div className="flex justify-center items-center pt-4">
          <p className="font-Open_Sans font-bold text-md text-indigo-500 no-underline tracking-normal leading-none ">
            Events
          </p>
          <p className="font-Open_Sans font-bold text-md text-indigo-500 no-underline tracking-normal leading-none  mx-2">
            Groups
          </p>
          <p className="font-Open_Sans font-bold text-md text-indigo-500 no-underline tracking-normal leading-none ">
            Follow
          </p>
          <p className="font-Open_Sans font-bold text-md text-indigo-500 no-underline tracking-normal leading-none mx-2 ">
            More
          </p>
        </div>
        <div className="ml-2">
          <p className="font-Open_Sans font-semibold text-md text-cyan-500 no-underline tracking-normal leading-none py-2 ">
            Social Profile
          </p>
          <div className="flex items-center">
            <img className="h-5 mb-3 mr-2 " src={fb} alt="facebook" />
            <p className="font-Open_Sans font-bold text-sm text-semibold text-transparent bg-clip-text bg-gradient-to-r to-red-700 from-blue-500 no-underline tracking-normal leading-none py-2">
              Social Network
            </p>
          </div>
          <div className="flex items-center">
            <img className="h-5 mb-3 mr-2 " src={yt} alt="facebook" />
            <p className="font-Open_Sans font-semibold text-sm text-transparent bg-clip-text bg-gradient-to-r to-red-700 from-blue-500 no-underline tracking-normal leading-none py-2">
              Social Network
            </p>
          </div>
          {/* <div className="flex items-center">
<img className="h-10 mb-3 mr-2 " src={link} alt="facebook" />
<p className="font-Open_Sans font-bold text-md text-transparent bg-clip-text bg-gradient-to-r to-red-700 from-blue-500 no-underline tracking-normal leading-none py-2">
    Social Network
</p>
</div> */}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center pt-4">
        <p className="font-Open_Sans font-semibold text-md no-underline tracking-normal landing-none py-2">
          Random Ads
        </p>
        <div
          style={{ width: `${progressBar()}%` }}
          className="bg-cyan-800 rounded-xl h-2 mb-5"
        >
          <img className="h-30 rounded-lg" src={data.image} alt="ads" />
        </div>
      </div>
    </div>
  );
};

export default Left;
