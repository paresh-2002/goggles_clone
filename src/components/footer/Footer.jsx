import React from "react";
import {
  AiFillGithub,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="py-5 mt-3  bg-amber-50 flex flex-wrap justify-center items-center gap-2 md:gap-10  absolute right-0 left-0 ">
      <p>Eyesome made with 💜 by Sandhya </p>
      <p className="flex gap-3">
        <a href="#">
          <AiFillGithub className="text-2xl text-gray-800" />
        </a>
        <a href="#">
          {" "}
          <AiOutlineLinkedin className="text-2xl text-gray-800" />
        </a>
        <a href="#">
          <AiOutlineTwitter className="text-2xl text-gray-800" />
        </a>
      </p>
    </div>
  );
};

export default Footer;
