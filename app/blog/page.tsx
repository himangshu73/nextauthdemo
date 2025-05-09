import Link from "next/link";
import { getAllPosts } from "@/lib/post";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group">
              <article className="hover:bg-gray-50 p-4 rounded-lg transition">
                <h2 className="text-2xl font-semibold group-hover:text-blue-600">
                  {post.title}
                </h2>
                <time className="text-gray-500 text-sm">
                  {new Date(post.date).toLocaleDateString()}
                </time>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
