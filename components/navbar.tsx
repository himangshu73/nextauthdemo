"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();
  const user = session?.user;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/blog", title: "Blog", label: "Read my blog" },
    { href: "/about", title: "About", label: "Learn more about me" },
    { href: "/contact", title: "Contact", label: "Get in touch" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-cyan-800 shadow-lg" : "bg-cyan-700"}`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          title="Go to homepage"
          className="text-2xl font-bold text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="bg-white text-cyan-700 rounded-full w-8 h-8 flex items-center justify-center">
            H
          </span>
          <span>Himangshu</span>
        </Link>

        <ul className="hidden md:flex items-center space-x-6 text-white">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                title={link.label}
                className="relative group"
                target={link.href.startsWith("http") ? "_blank" : undefined}
              >
                {link.title}
              </Link>
            </li>
          ))}

          {status === "authenticated" ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2"
                title="User dashboard"
              >
                <div className="w-8 h-8 rounded-full bg-white text-cyan-700 flex items-center justify-center font-medium">
                  {user?.name?.charAt(0)}
                </div>
              </Link>
              <button
                onClick={() => signOut()}
                className="px-4 py-1 rounded-full border border-white text-white hover:bg-white hover:text-cyan-700 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : status === "unauthenticated" ? (
            <button
              onClick={() => signIn()}
              className="px-4 py-1 rounded-full border border-white text-white hover:bg-white hover:text-cyan-700 transition-colors"
            >
              Login
            </button>
          ) : null}
        </ul>

        <button
          className="text-white md:hidden p-2 rounded-lg hover:bg-cyan-600 transition-colors"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 bg-cyan-700">
          <ul className="space-y-3 text-white">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  title={link.label}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 px-3 rounded-lg hover:bg-cyan-600 transition-colors"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                >
                  {link.title}
                </Link>
              </li>
            ))}

            <div className="pt-2 border-t border-cyan-600">
              {status === "authenticated" ? (
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-white text-cyan-700 flex items-center justify-center font-medium">
                      {user?.name?.charAt(0)}
                    </div>
                    <span className="font-medium">{user?.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      signOut();
                    }}
                    className="w-full text-left py-2 px-3 rounded-lg hover:bg-cyan-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : status === "unauthenticated" ? (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signIn();
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  Login
                </button>
              ) : null}
            </div>
          </ul>
        </div>
      )}
    </header>
  );
}
