"use client";

import { useState } from "react";
import { ConversionCard } from "./components/convertion-card";
import { conversions } from "@/utils/convertions.data";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowDownIcon, FileIcon } from "lucide-react";

export default function FileConverter() {
  return (
    <div className="container mx-auto p-6 space-y-10">
      <header className="text-center">
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 shadow-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          QuickConvo
        </motion.h1>
        <motion.p
          className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Transform your files instantly and for free. Convert documents,
          spreadsheets, and images to various formats with ease.
        </motion.p>
      </header>

      <section className="w-full max-w-2xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-semibold mb-6 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
              1
            </div>
            <p className="text-xl text-gray-700">Choose your conversion type</p>
          </div>
          <ArrowDownIcon className="mx-auto text-gray-400 w-6 h-6" />
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xl">
              2
            </div>
            <p className="text-xl text-gray-700">Upload your file</p>
          </div>
          <ArrowDownIcon className="mx-auto text-gray-400 w-6 h-6" />
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xl">
              3
            </div>
            <p className="text-xl text-gray-700">
              Download your converted file
            </p>
          </div>
        </motion.div>
      </section>

      <section className="w-full flex flex-col items-center text-center">
        <motion.h2
          className="mb-6 text-4xl font-semibold text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Free Conversion Tools
        </motion.h2>
        <motion.p
          className="text-center mb-10 text-xl text-gray-600 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Choose from our wide range of file conversion options.
        </motion.p>

        <div className="w-full flex flex-row flex-wrap justify-center gap-6">
          {conversions.map((conversion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
            >
              <ConversionCard {...conversion} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
