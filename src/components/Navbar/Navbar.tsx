import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div>
          <Link className="flex items-center space-x-2" href="/">
            <Image
              src="/logo.ico"
              alt="QuickConvo Logo"
              width={40}
              height={40}
            />
            <span className="text-2xl font-bold text-gray-800">QuickConvo</span>
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          {/* <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact
            </Link> */}
        </div>
        {/* <Button className="md:hidden" variant="ghost" size="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
          <span className="sr-only">Open menu</span>
        </Button> */}
      </div>
    </nav>
  );
}
