import { getAllPostSlugs, getContent } from "@/lib/post";
import Link from "next/link";

const BlogIndex = () => {
  const slugs = getAllPostSlugs();
  const posts = slugs.map((slug) => getContent(slug));
  return (
    <div>
      <h1 className="text-2xl font-bold">Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-bold">{post.title}</h2>
            </Link>
            <p className="text-sm text-gray-400">Date:{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogIndex;
