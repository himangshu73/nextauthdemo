import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, PostMeta } from "@/types/blog";

const postDir = path.join(process.cwd(), "posts");

export function getAllPostSlugs(): string[] {
  return fs
    .readdirSync(postDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postDir, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    title: data.title,
    date: data.date,
    ...data,
  } as Post;
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs();
  return slugs
    .map((slug) => {
      const { content, ...meta } = getPostBySlug(slug);
      return meta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
