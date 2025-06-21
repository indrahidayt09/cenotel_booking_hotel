import Link from "next/link";
import React from "react";
import { NavLinks } from "./navlinks";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="fixed inset-x-0 top-0 px-2 py-3 z-1000 bg-white shadow-sm">
      <div className="flex justify-between items-center px-3 ">
        <Link href="/">
          <Image
            src="/images/logo.png"
            width={110}
            height={110}
            alt="Hotel logo"
            priority
          />
        </Link>
        <NavLinks />
      </div>
    </div>
  );
};

export default Navbar;
