"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

export default function Navbar({ session }: { session: Session | null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = session?.user;
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
          Himangshu
        </Link>
        <button
          className="text-white md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <ul className="hidden md:flex space-x-6 text-white">
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
          {user ? (
            <>
              <li className="font-semibold">{user.name?.split(" ")[0]}</li>
              <li>
                <button onClick={() => signOut()} className="hover:font-bold">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={() => signIn()} className="hover:font-bold">
                Login
              </button>
            </li>
          )}
        </ul>
      </nav>

      {menuOpen && (
        <ul className="md:hidden px-4 pb-4 space-y-2 text-white bg-cyan-700">
          <li>
            <Link
              href="/blog"
              title="Read our blog"
              onClick={() => setMenuOpen(false)}
              className="block hover:font-bold"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="#"
              title="Learn more about us"
              onClick={() => setMenuOpen(false)}
              className="block hover:font-bold"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#"
              title="Contact us"
              onClick={() => setMenuOpen(false)}
              className="block hover:font-bold"
            >
              Contact
            </Link>
          </li>
          {user ? (
            <>
              <li className="font-semibold">{user.name?.split(" ")[0]}</li>
              <li>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                  className="hover:font-bold"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  signIn();
                }}
                className="hover:font-bold"
              >
                Login
              </button>
            </li>
          )}
        </ul>
      )}
    </header>
  );
}
