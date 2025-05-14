import { getContent } from "@/lib/post";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default async function Blog({ params }: { params: { slug: string } }) {
  console.log(params.slug);
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
