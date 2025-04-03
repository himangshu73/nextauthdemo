import React from "react";
import SignIn from "./sign-in";

const Navbar = () => {
  return (
    <div className="p-6 flex justify-between items-center bg-gray-200">
      <h1 className="text-4xl cursor-pointer">Next Auth Demo</h1>
      <div>
        <SignIn />
      </div>
    </div>
  );
};

export default Navbar;
