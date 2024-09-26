import React from "react";
import { BsStarHalf } from "react-icons/bs";
import { GiRoundStar } from "react-icons/gi";
const StarRating = ({ product }) => {
  const ratingDiff = product?.rating - Math.floor(product?.rating);
  return ratingDiff ? (
    <>
      {new Array(Math.floor(product?.rating ?? 5)).fill().map((i) => (
        <GiRoundStar className=" text-yellow-400 mb-1" />
      ))}
      <BsStarHalf className=" text-yellow-400 mb-1" />
    </>
  ) : (
    new Array(Math.floor(product?.rating ?? 5))
      .fill()
      .map((i) => <GiRoundStar className=" text-yellow-400 mb-1" />)
  );
};

export default StarRating;
