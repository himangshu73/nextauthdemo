import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postDir = path.join(process.cwd(), "posts");

export function getAllPostSlugs(): string[] {
  return fs
    .readdirSync(postDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getContent(slug: string) {
  const filePath = postDir + `/${slug}.md`;
  const content = fs.readFileSync(filePath, "utf8");
  const meta = matter(content);
  return {
    slug,
    title: meta.data.title || "",
    date: meta.data.date || "",
    content: meta.content || "",
  };
}
