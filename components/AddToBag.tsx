"use client";

import { useShoppingCart } from "use-shopping-cart";
import { Button } from "./ui/button";
import { urlFor } from "@/app/lib/sanity";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  id: string;
}

const AddToBag = ({ currency, description, image, name, price, id }: ProductCart) => {
  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    id: id,
  };
  return (
    <Button
      onClick={() => {
        addItem(product), handleCartClick();
      }}
    >
      Add To Cart
    </Button>
  );
};

export default AddToBag;
