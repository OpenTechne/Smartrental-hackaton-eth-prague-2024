import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import mammoth from "mammoth";
import TurndownService from "turndown";

const TOAST_DURATION = 3000;

const useDocxFile = () => {
  const toast = useToast();
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

    reader.onload = async (event) => {
      const result = event.target?.result;

      console.log(result);
      let content = "";
      try {
        if (
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.type === "application/msword"
        ) {
          const htmlConversionResult = await mammoth.convertToHtml({
            arrayBuffer: result,
          });
          const turndownService = new TurndownService();
          content = turndownService.turndown(htmlConversionResult.value);
        } else {
          toast({
            title: "This file is not supported. Please upload a docx file",
            duration: TOAST_DURATION,
            status: "error",
            position: "bottom-right",
            variant: "subtle",
          });
        }
      } catch (error) {
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
  };

  const resetDocument = () => {
    setDocument(null);
  };

  return { document, handleFileChange, resetDocument };
};

export default useDocxFile;
