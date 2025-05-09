declare module "*.md" {
  const content: string;
  export default content;
}

export interface PostMeta {
  title: string;
  date: string;
  slug: string;
  [key: string]: any;
}

export interface Post extends PostMeta {
  content: string;
}
