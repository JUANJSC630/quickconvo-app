"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  FileIcon,
  UploadIcon,
  DownloadIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ExcelToPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];

      const fileType = selectedFile.type;
      if (
        fileType !== "application/vnd.ms-excel" &&
        fileType !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setError("Please upload a valid Excel document (XLS or XLSX).");
        setFile(null);
      } else {
        setFile(selectedFile);
        setError(null);
        setPdfUrl(null);
      }
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPdfUrl(null);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    let apiUrl = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiUrl) {
      apiUrl = "https://convertio-fp4o.onrender.com/api";
    }

    try {
      const response = await fetch(`${apiUrl}/format-to-pdf`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to convert the file");
      }

      const reader = response.body?.getReader();
      const contentLength = +(response.headers.get("Content-Length") ?? "0");
      let receivedLength = 0;
      const chunks = [];

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        chunks.push(value);
        receivedLength += value.length;
        setProgress(Math.round((receivedLength / contentLength) * 100));
      }

      const blob = new Blob(chunks);
      const downloadUrl = window.URL.createObjectURL(blob);

      setPdfUrl(downloadUrl);
    } catch (err) {
      setError("An error occurred during conversion. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <motion.div
        className="container mx-auto p-6 flex items-center justify-start"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
      >
        <Link href="/">
          <span className="flex items-center space-x-2 bg-white p-2 rounded-full hover:bg-gray-100">
            <ArrowLeftIcon className="w-6 h-6 text-whit" />
          </span>
        </Link>
      </motion.div>
      <div className="container mx-auto p-6">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Excel to PDF Converter
        </motion.h1>
        <motion.p
          className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Transform your Excel documents to PDF format quickly and easily.
        </motion.p>

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Excel document (XLS or XLSX)
                  </p>
                </div>
                <Input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />
              </label>
            </div>

            <AnimatePresence>
              {file && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center p-4 bg-blue-50 rounded-lg"
                >
                  <FileIcon className="w-6 h-6 text-blue-500 mr-3" />
                  <span className="text-sm text-gray-700 truncate">
                    {file.name}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              onClick={handleConvert}
              disabled={!file || isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-700 text-white"
            >
              {isLoading ? "Converting..." : "Convert to PDF"}
            </Button>

            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Progress value={progress} className="w-full" />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {pdfUrl && file && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-4"
                >
                  <p className="text-green-500 mb-2">Conversion successful!</p>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-green-600 hover:to-emerald-700 text-white"
                  >
                    <a
                      href={pdfUrl}
                      download={`${file.name.replace(
                        /\.[^/.]+$/,
                        ""
                      )}-converted.pdf`}
                    >
                      <DownloadIcon className="mr-2 h-4 w-4" /> Download PDF
                    </a>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
