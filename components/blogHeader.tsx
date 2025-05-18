import Link from "next/link";

export default function BlogHeader() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-400 shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/blog">
          {" "}
          <h1 className="text-4xl text-white text-center font-extrabold tracking-tight">
            Himangshu&apos;s Blog
          </h1>
        </Link>
        <p className="text-sm text-blue-100 text-center italic mt-2">
          Thoughts, tutorials & insights
        </p>
      </div>
    </header>
  );
}
