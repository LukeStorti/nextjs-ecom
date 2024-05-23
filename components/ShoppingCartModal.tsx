"use client";
import { useShoppingCart } from "use-shopping-cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

const ShoppingCartModal = () => {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    incrementItem,
    decrementItem,
  } = useShoppingCart();
  console.log(cartDetails);
  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <h1 className="py-6">Your cart is empty</h1>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className="flex py-6 ">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={entry.image as string}
                          alt="product image"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-muted-foreground">
                            <h3>{entry.name}</h3>
                            <p className="ml-4 text-black">${entry.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                            {entry.description}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-muted-foreground">QTY: {entry.quantity}</p>
                          <div className="flex">
                            <div className="flex gap-2">
                              <button
                                type="button"
                                className="font-medium text-primary hover:text-primary/80"
                                onClick={() => decrementItem(entry.id)}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                className="font-medium text-primary hover:text-primary/80"
                                onClick={() => incrementItem(entry.id)}
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                className="font-medium text-primary hover:text-primary/80"
                                onClick={() => removeItem(entry.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-muted-foreground">
              <p>Subtotal:</p>
              <p className="text-black">${totalPrice}</p>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Shipping & taxes are calculated at checkout.
            </p>
            <div className="mt-6">
              <Button className="w-full">Checkout</Button>
            </div>

            <div className="mt-6 flex justify-center text-center text-sm text-muted-foreground">
              <p>
                OR{" "}
                <button
                  className="font-medium text-primary hover:text-primary/80"
                  onClick={() => handleCartClick()}
                >
                  continue shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartModal;
