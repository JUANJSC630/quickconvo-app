"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ConversionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];

      const fileType = selectedFile.type;
      if (
        fileType !== "application/msword" &&
        fileType !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setError("Please upload a valid Word document (DOC or DOCX).");
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

    const formData = new FormData();
    formData.append("file", file);

    let apiUrl = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiUrl) {
      apiUrl = "https://convertio-fp4o.onrender.com/api";
    }

    try {
      // Enviar el archivo a la API de conversión
      const response = await fetch(`${apiUrl}/word-to-pdf`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to convert the file");
      }

      // Obtener el archivo convertido como Blob
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      // Setear el URL para el enlace de descarga
      setPdfUrl(downloadUrl);
    } catch (err) {
      setError("An error occurred during conversion. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          QuickConvo - Convert Word to PDF
        </h1>

        <div className="space-y-4">
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <Button
            onClick={handleConvert}
            disabled={!file || isLoading}
            className="w-full"
          >
            {isLoading ? "Converting..." : "Convert"}
          </Button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {pdfUrl && file && (
            <div className="mt-4">
              <p className="text-green-600 mb-2">Conversion successful!</p>
              <a
                href={pdfUrl}
                download={`${file.name.replace(/\.[^/.]+$/, "")}-converted.pdf`} // Nombre del archivo descargado
                className="text-blue-600 hover:underline"
              >
                Download PDF file
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
