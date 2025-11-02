"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface ImagePreviewsProps {
  images?: string[];
}

const fallbackImage = "/property-image-0.jpg"; // must exist in /public

const ImagePreviews = ({ images = [] }: ImagePreviewsProps) => {
  console.log(images);
  const demoImages = [
    "/property-image-0.jpg",
    "/property-image-1.jpg",
    "/property-image-2.jpg",
    "/property-image-3.jpg",
    "/property-image-4.jpg",
  ];

  const [finalImages, setFinalImages] = useState(images);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? finalImages.length - 1 : prev - 1
    );

  const handleNext = () =>
    setCurrentImageIndex((prev) =>
      prev === finalImages.length - 1 ? 0 : prev + 1
    );

  return (
    <div className="relative h-[450px] w-full">
      {finalImages.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            idx === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={img}
            alt={`Property Image ${idx + 1}`}
            fill
            style={{ objectFit: "cover" }}
            onError={() => {
              setFinalImages((prev) =>
                prev.map((image, index) =>
                  index === idx ? demoImages[index] : image
                )
              );
            }}
            priority={idx === 0}
          />
        </div>
      ))}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary-700 bg-opacity-50 p-2 rounded-full z-20"
        aria-label="Previous image"
      >
        <ChevronLeft className="text-white w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-700 bg-opacity-50 p-2 rounded-full z-20"
        aria-label="Next image"
      >
        <ChevronRight className="text-white w-5 h-5" />
      </button>
    </div>
  );
};

export default ImagePreviews;
