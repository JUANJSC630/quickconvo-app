import React from "react";

export default function Footer() {
  return (
    <footer className="w-full h-[70px] mt-10 p-6 bg-white">
      <div className="container mx-auto text-center flex flex-col items-center justify-center">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} QuickConvo. All rights reserved.
        </p>
        {/* <nav className="flex justify-center space-x-4 mt-4">
          <a
            href="#"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Contact Us
          </a>
        </nav> */}
      </div>
    </footer>
  );
}
