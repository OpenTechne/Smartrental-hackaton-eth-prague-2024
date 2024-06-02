import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { pdfjs } from "react-pdf";
import mammoth from "mammoth";
import TurndownService from "turndown";
import { TOAST_DURATION } from "../constants/toast";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const useFileUploader = () => {
  const toast = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [document, setDocument] = useState(null);

  const handleFileChange = async (files) => {
    if (!files) {
      toast({
        title: "No file selected",
        duration: TOAST_DURATION,
        status: "error",
        position: "bottom-right",
        variant: "subtle",
      });
      return;
    }

    const file = files[0];
    const reader = new FileReader();

    reader.onloadstart = () => {
      setIsUploading(true);
    };

    reader.onload = async (event) => {
      const result = event.target?.result;

      let content = "";
      try {
        if (file.type === "application/pdf") {
          const blobUrl = URL.createObjectURL(file);
          const loadingTask = pdfjs.getDocument(blobUrl);
          const pdf = await loadingTask.promise;
          const numPages = pdf.numPages;
          let extractedText = "";

          for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
            const page = await pdf.getPage(pageNumber);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
              .map((item) => item.str)
              .join(" ");
            extractedText += pageText;
          }

          content = extractedText;
          URL.revokeObjectURL(blobUrl);
        } else if (
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.type === "application/msword"
        ) {
          const htmlConversionResult = await mammoth.convertToHtml({
            arrayBuffer: result,
          });
          const turndownService = new TurndownService();
          content = turndownService.turndown(htmlConversionResult.value);
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Error loading the document",
          duration: TOAST_DURATION,
          status: "error",
          position: "bottom-right",
          variant: "subtle",
        });
        return;
      }
      const newDocument = { name: file.name, content };
      setDocument(newDocument);
    };

    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      setIsUploading(false);
    };
  };

  const resetDocument = () => {
    setDocument(null);
  };

  return { isUploading, document, handleFileChange, resetDocument };
};

export default useFileUploader;
