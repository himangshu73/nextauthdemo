import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/post";
import ReactMarkdown from "react-markdown";

interface Params {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: Params) {
  try {
    const post = getPostBySlug(params.slug);

    return (
      <article className="container mx-auto py-12 prose lg:prose-xl">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <time className="text-gray-500 block mb-8">
          {new Date(post.date).toLocaleDateString()}
        </time>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    );
  } catch (error) {
    return notFound();
  }
}
