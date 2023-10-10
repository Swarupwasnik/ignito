import React from "react";

const Card = ({ User, img, status }) => {
  return (
    <div>
      <div className="relative">
        <img
          className="h-80 w-48 rounded-2xl hover:scale-105 duration-700 ease-in-out cursor-pointer shadow-lg"
          src={img}
          alt={User}
        ></img>
        <p className=" absolute bottom-4 left-4 text-sm font-medium text-white font-roboto no-underline leading-none">
          {User}
        </p>
        <p
          className={`${
            status === "Offline"
              ? "absolute bottom-4 right-4 text-sm font-medium text-yellow-600 font-roboto no-underline leading-none"
              : "absolute bottom-4 right-4 text-sm font-medium text-green-900 font-roboto no-underline leading-none"
          }`}
        >
          {status}
        </p>
      </div>
    </div>
  );
};

export default Card;