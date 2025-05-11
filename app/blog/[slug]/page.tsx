import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/post";
import ReactMarkdown from "react-markdown";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getAllPosts(); // ensure this is async
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) return notFound();

  return (
    <article className="container mx-auto py-12 prose lg:prose-xl">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <time className="text-gray-500 block mb-8">
        {new Date(post.date).toLocaleDateString()}
      </time>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}
