import { getContent } from "@/lib/post";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface BlogProps {
  params: { slug: string };
}

export default async function Blog({ params }: BlogProps) {
  const slug = params.slug;

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
