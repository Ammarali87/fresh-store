import React from "react";
import Slider from "react-slick"; // Importing the react-slick Slider
import RelatedProduct from "./RelatedProduct";

export default function ProductSlider({ products }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: true,
    nextArrow: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="bg-red-500 size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
        />
      </svg>
    ),
    prevArrow: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
        />
      </svg>
    ),
  };

  return (
    <Slider  className="w-full mb-[17%]  max-h-[20vh]  mx-auto " {...settings}>
      {products?.map((product, index) => (
        <RelatedProduct  key={index} product={product} />
        
      ))}   
    </Slider>
  );
}
