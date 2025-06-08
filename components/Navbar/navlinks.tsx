"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const NavLinks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      {session?.user ? (
        <div className="flex items-center flex-row-reverse justify-end gap-5 order-1">
          <div className="hidden p-1 bg-slate-300 text-sm overflow-hidde  rounded-full md:me-0 md:block  ">
            <Image
              src={session.user.image || "/images/avatar.svg"}
              alt="user avatar"
              width={64}
              height={64}
              className="size-8 rounded-full"
            />
          </div>
          <div className="flex items-center">
            <button
              onClick={() => signOut()}
              className="hidden md:block hover:text-blue-500 text-slate-400 rounded-sm cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : null}

      <button
        onClick={handleClick}
        className={clsx(
          "inline-flex justify-center items-center text-sm p-2 hover:text-slate-700 md:hidden order-1",
          isOpen ? "text-slate-700" : "text-slate-500"
        )}
      >
        {!isOpen ? (
          <AiOutlineMenuFold className="size-8" />
        ) : (
          <AiOutlineMenuUnfold className="size-8" />
        )}
      </button>

      <div
        className={clsx(
          "absolute md:static w-70 md:w-auto top-17 md:top-0 transition-all duration-500 md:block",
          isOpen ? "right-3" : "-right-[100%]"
        )}
      >
        <ul className="flex flex-col md:flex-row gap-6 md:gap-0 font-semibold text-sm uppercase p-4 mt-4 rounded-xs min-h-screen md:min-h-0 md:items-center md:space-x-10 md:p-0 md:mt-0 md:border-0 bg-slate-100 md:bg-transparent">
          <li>
            <Link
              href="/"
              className={clsx(
                "block py-2 rounded-sm md:p-0",
                pathname === "/" ? "text-blue-500" : "text-slate-700",
                "hover:text-blue-500"
              )}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/About"
              className={clsx(
                "block py-2 rounded-sm md:p-0",
                pathname === "/About" ? "text-blue-500" : "text-slate-700",
                "hover:text-blue-500"
              )}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/room"
              className={clsx(
                "block py-2 rounded-sm md:p-0",
                pathname === "/room" ? "text-blue-500" : "text-slate-700",
                "hover:text-blue-500"
              )}
            >
              Rooms
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={clsx(
                "block py-2 rounded-sm md:p-0",
                pathname === "/contact" ? "text-blue-500" : "text-slate-700",
                "hover:text-blue-500"
              )}
            >
              Contact
            </Link>
          </li>
          {session && (
            <>
              <li>
                <Link
                  href="/reservation"
                  className={clsx(
                    "block py-2 rounded-sm md:p-0",
                    pathname === "/reservation"
                      ? "text-blue-500"
                      : "text-slate-700",
                    "hover:text-blue-500"
                  )}
                >
                  Reservations
                </Link>
              </li>
              {session.user.role === "admin" && (
                <>
                  <li>
                    <Link
                      href="/admin/dasboard"
                      className={clsx(
                        "block py-2 rounded-sm md:p-0",
                        pathname === "/admin/dasboard"
                          ? "text-blue-500"
                          : "text-slate-700",
                        "hover:text-blue-500"
                      )}
                    >
                      Dasboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/room"
                      className={clsx(
                        "block py-2 rounded-sm md:p-0",
                        pathname === "/admin/room"
                          ? "text-blue-500"
                          : "text-slate-700",
                        "hover:text-blue-500"
                      )}
                    >
                      Manage Rooms
                    </Link>
                  </li>
                </>
              )}
            </>
          )}

          {session ? (
            <li className="pt-2 md:pt-0">
              <button
                onClick={() => signOut()}
                className=" md:hidden py-2 px-5 bg-blue-500 hover:bg-blue-600 rounded-xs text-slate-100 text-1xl"
              >
                SIGN OUT
              </button>
            </li>
          ) : (
            <li className="pt-2 md:pt-0">
              <Link
                href="/signin"
                className="py-2 px-5 bg-blue-500 hover:bg-blue-400 rounded-xs text-slate-100 text-1xl"
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
