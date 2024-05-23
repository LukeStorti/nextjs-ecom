"use client";

import { urlFor } from "@/app/lib/sanity";
import Image from "next/image";
import { useState } from "react";

interface iAppProps {
  images: any;
}

const ImageGallery = ({ images }: iAppProps) => {
  const [bigImg, setBigImg] = useState(images[0]);

  const handleSmallImageClick = (image: any) => {
    setBigImg(image);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((item: any, i: any) => (
          <div key={i} className="overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={urlFor(item).url()}
              width={200}
              height={200}
              alt="product image"
              className="h-full w-full object-cover object-center cursor-pointer"
              onClick={() => handleSmallImageClick(item)}
            />
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <Image
          src={urlFor(bigImg).url()}
          alt="product image"
          width={500}
          height={500}
          className="w-full h-full object-cover object-center"
        />

        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  );
};

export default ImageGallery;
