import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import AddToBag from "@/components/AddToBag";
import ImageGallery from "@/components/ImageGallery";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
        _id,
          images,
          price,
          name,
          description,
          "slug": slug.current,
          "categoryName": category -> name
      }`;
  const data = await client.fetch(query);

  return data;
}

const ProductDetailPage = async ({ params }: { params: { slug: string } }) => {
  const data: fullProduct = await getData(params.slug);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-8 md:px-8 mb-24">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />
          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-muted-foreground">{data.categoryName}</span>
              <h2 className="text-2xl font-bold lg:text-3xl">{data.name}</h2>
            </div>

            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className="rounded-full gap-x-2">
                <span className="text-sm">4.2</span>
                <Star className="h-5 w-5" />
              </Button>

              <span className="text-sm text-muted-foreground transition duration-100">
                56 Ratings
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold md:text-2xl">${data.price}</span>
                <span className="mb-1 text-red-500 line-through">${data.price + 30}</span>
              </div>

              <span className="text-sm text-muted-foreground">Incl. Vat + Shipping</span>
            </div>

            <div className="mb-6 flex items-center gap-2 text-muted-foreground">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2 - 4 Days Shipping</span>
            </div>

            <div className="flex gap-2.5">
              <AddToBag
                currency="USD"
                description={data.description}
                image={data.images[0]}
                name={data.name}
                price={data.price}
                key={data._id}
                id={data._id}
              />
              <Button variant={"secondary"}>Checkout Now</Button>
            </div>

            <p className="mt-12 text-base text-muted-foreground tracking-wide">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
