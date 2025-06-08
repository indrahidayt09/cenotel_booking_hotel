import Link from "next/link";
import React from "react";
import { NavLinks } from "./navlinks";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="fixed inset-x-0 top-0 p-2 py-3 bg-slate-50 shadow-sm z-10">
      <div className="flex justify-between items-center px-3 md:px-5">
        <Link href="/">
          <Image
            src="/images/logo.png"
            width={120}
            height={120}
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
