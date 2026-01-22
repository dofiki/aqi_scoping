import React from "react";
import { IoLogIn } from "react-icons/io5";

const Button = ({ buttonMessage }: { buttonMessage: string }) => {
  return (
    <>
      <button
        type="submit"
        className="bg-hover py-2 text-black rounded-2xl w-full
              text-sm md:text-base opacity-80 hover:opacity-100 
              transition-all delay-75 ease-in-out flex items-center gap-2 
              justify-center cursor-pointer"
      >
        <IoLogIn size={18} />
        {buttonMessage}
      </button>
    </>
  );
};

export default Button;
