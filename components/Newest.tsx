import { simplifiedProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getData() {
  const query = `*[_type  == "product"][0...4] | order(_createdAt desc) {
        _id,
          price,
          name,
          "slug": slug.current,
          "categoryName": category->name,
          "imageUrl": images[0].asset->url
      }`;

  const data: simplifiedProduct[] = await client.fetch(query);

  return data;
}

const Newest = async () => {
  const data = await getData();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Our Newset Products</h2>
          <Link href="/all" className="flex items-center gap-x-1 font-semibold">
            See All{" "}
            <span>
              <ArrowRight className="text-primary" />
            </span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((item) => (
            <div key={item._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Image
                  src={item.imageUrl}
                  alt="product image"
                  className="w-full h-full object-cover object-center lg:w-full lg:h-full"
                  width={300}
                  height={300}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-muted-foreground">
                    <Link href={`/product/${item.slug}`}>{item.name}</Link>
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.categoryName}</p>
                </div>
                <p className="font-medium text-sm">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newest;
