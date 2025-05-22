import Link from "next/link";

export default async function Navbar() {
  return (
    <header className="bg-cyan-700 shadow-md sticky top-0 z-50">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          title="Go to homepage"
          className="text-2xl font-bold text-white"
        >
          Himangshu.xyz
        </Link>
        <ul className="flex space-x-6 text-white">
          <li>
            <Link
              href="/blog"
              title="Read our blog"
              className="hover:font-bold"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="#"
              title="Learn more about us"
              className="hover:font-bold"
            >
              About
            </Link>
          </li>
          <li>
            <Link href="#" title="Contact us" className="hover:font-bold">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
