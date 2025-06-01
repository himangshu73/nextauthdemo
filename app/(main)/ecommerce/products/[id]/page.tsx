import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Review {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  stock: number;
  description: string;
  thumbnail: string;
  reviews: Review[];
  images: string[];
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      return notFound();
    }
    const product: Product = await response.json();

    if (!product.id) {
      return notFound();
    }
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="w-full md:w-1/2">
            <Image
              src={product.images[0]}
              width={600}
              height={600}
              alt={product.title}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-600">
                {product.title}
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                {product.description}
              </p>
              <p className="text-2xl font-semibold text-blue-600">
                ${product.price}
              </p>
              <p
                className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
              >
                {product.stock > 0
                  ? `In Stock: ${product.stock}`
                  : "Out of stock"}
              </p>
            </div>
            <Button>Add to Cart</Button>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          {product.reviews?.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review: Review, index: number) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-yellow-600">
                      ⭐ {review.rating}/5
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-800">{review.comment}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    - {review.reviewerName}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
