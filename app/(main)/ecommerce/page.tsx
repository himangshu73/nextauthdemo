import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
}

export default async function Ecommerce() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.products.map((item: Product) => (
          <div
            key={item.id}
            className="border rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex justify-center">
              <Link href={`/ecommerce/products/${item.id}`}>
                <Image
                  src={item.thumbnail}
                  width={200}
                  height={200}
                  alt={item.title}
                />
              </Link>
            </div>
            <div className="p-4">
              <Link href={`/ecommerce/products/${item.id}`}>
                <h2 className="text-xl font-semibold">{item.title}</h2>
              </Link>
              <p className="text-gray-600">Price: ${item.price}</p>
              <p className="text-sm text-gray-500 mt-2 mb-4">
                {item.description}
              </p>
              <div className="flex justify-end">
                <Button>Add to Cart</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
