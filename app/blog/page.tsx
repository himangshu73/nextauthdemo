import { getAllPostSlugs, getContent } from "@/lib/post";
import Link from "next/link";

const BlogIndex = () => {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getContent(slug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-3xl mx-auto px-4 mt-10">
      <h1 className="text-3xl font-extrabold text-center mb-2">Latest Posts</h1>
			<div className="w-24 h-1 bg-blue-500 mx-auto mb-8 rounded"></div>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200" key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">{post.title}</h2>
            </Link>
            <p className="text-sm text-gray-500 mt-1">Published:{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogIndex;
