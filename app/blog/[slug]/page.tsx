import { getAllPostSlugs, getContent } from "@/lib/post";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface BlogProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Blog({ params }: BlogProps) {
  const { slug } = await params;

  const post = getContent(slug);

  if (!post) return notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-8 bg-white">
      <header className="mb-6 border-b pb-4">
        <h2 className="text-3xl font-bold text-blue-800">{post.title}</h2>
        <p className="text-sm text-gray-500 mt-1">Published:{post.date}</p>
      </header>
      <section className="prose prose-sm sm:prose lg:prose-lg prose-blue">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </section>
    </article>
  );
}
