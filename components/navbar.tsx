import React from "react";
import SignIn from "./sign-in";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="p-6 flex justify-between items-center bg-gray-200">
      <Link href="/" className="text-4xl cursor-pointer">Next Auth Demo</Link>
      <div>
        <SignIn />
      </div>
    </div>
  );
};

export default Navbar;
