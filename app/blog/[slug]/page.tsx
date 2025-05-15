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
    <div>
      <div>
        <h2>{post.title}</h2>
        <p>{post.date}</p>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
}
