 
import React, { useEffect, useState } from "react";

import banner1 from "../Banner/banners_img/img-1.png";
import banner2 from "../Banner/banners_img/img-2.png";
import banner3 from "../Banner/banners_img/img-3.png";

const Banner = () => {
  const banners = [banner1, banner2, banner3];

  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Next Slide
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  // Previous Slide
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative w-full h-[500px] rounded-lg mb-2 overflow-hidden mt-2 bg-gray-950">

      {/* Banner Slider */}
      <div
        className="flex w-full h-full transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            className="min-w-full h-full flex items-center justify-center"
          >
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-fill"
            />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2
        bg-black/50 text-white w-10 h-10 md:w-12 md:h-12
        rounded-full hover:bg-blue-600 transition-all duration-300"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2
        bg-black/50 text-white w-10 h-10 md:w-12 md:h-12
        rounded-full hover:bg-blue-600 transition-all duration-300"
      >
        ❯
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              current === index
                ? "w-8 bg-blue-500"
                : "w-2.5 bg-white"
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export default Banner;
