import { notFound } from "next/navigation";
import Image from "next/image";

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
  images:string[]
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const { id } = params;
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      return notFound();
    }
    const product: Product = await response.json();

    if (!product.id) {
      return notFound();
    }
    return (
      <div className="container">
        <div className="flex">
          <Image
            src={product.images[0]}
            width={400}
            height={400}
            alt={product.title}
            className="p-2"
          />
          <div className="p-2">
            <h2 className="text-xl font-bold">{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stocks: {product.stock}</p>

            {product.reviews.map((review: Review, index: number) => (
              <div key={index}>
                <p>Rating: {review.rating}</p>
                <p>Comment: {review.comment}</p>
                <p>Date: {new Date(review.date).toLocaleDateString()}</p>
                <p>Name: {review.reviewerName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
