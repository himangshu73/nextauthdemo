import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 py-8">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-gray-400">
            &copy; {currentYear}{" "}
            <Link href="/" className="hover:text-white transition-colors">
              Himangshu.xyz
            </Link>
            . All rights reserved
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Built with Next.js and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
