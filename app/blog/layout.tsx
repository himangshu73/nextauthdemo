import BlogHeader from "@/components/blogHeader";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
     
        <BlogHeader />
			<main
        className="flex justify-center flex-1 px-4 py-8"><div className="max-w-4xl w-full bg-white shadow-sm rounded-xl p-6">{children}</div>
     </main>

			<footer className="text-sm text-center text-gray-500 py-4">&copy;{new Date().getFullYear()} Himangshu. All rights reserved.</footer>
    </div>
  );
}
