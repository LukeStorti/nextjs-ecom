"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";

const links = [
  { name: "Home", href: "/" },
  { name: "Men", href: "/Men" },
  { name: "Women", href: "/Women" },
  { name: "Teens", href: "/Teens" },
];

const Navbar = () => {
  const pathName = usePathname();
  const { handleCartClick } = useShoppingCart();
  return (
    <header className="mb-8 border-b">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <Link href="/">
          <h1 className="text-2xl md:text-4xl font-bold">
            Urban
            <span className="text-primary">Blend</span>
          </h1>
        </Link>

        <nav className="hidden gap-12 lg:flex 2xl:ml-16">
          {links.map((item, i) => (
            <div key={i}>
              {pathName === item.href ? (
                <Link href={item.href} className="text-lg font-semibold text-primary">
                  {item.name}
                </Link>
              ) : (
                <Link
                  href={item.href}
                  className="text-lg font-semibold text-muted-foreground transition duration-100 hover:text-primary"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="flex divide-x border-r sm:border-l">
          <Button
            variant={"outline"}
            className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
            onClick={() => handleCartClick()}
          >
            <ShoppingBag />
            <span className="hidden text-sm font-semibold text-muted-foreground sm:block">
              Cart
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
