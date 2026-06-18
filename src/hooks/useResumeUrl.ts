import { useState, useEffect } from "react";
import resumePdf from "@/assets/shadab-resume.pdf";

let cachedBlobUrlPromise: Promise<string> | null = null;

const getBlobUrl = (): Promise<string> => {
  if (cachedBlobUrlPromise) return cachedBlobUrlPromise;

  // Guard against server-side rendering execution
  if (typeof window === "undefined") {
    return Promise.resolve(resumePdf);
  }

  cachedBlobUrlPromise = fetch(resumePdf)
    .then((res) => res.blob())
    .then((blob) => URL.createObjectURL(blob))
    .catch((err) => {
      console.error("Error creating resume blob URL:", err);
      return resumePdf; // Fallback to raw URL on failure
    });
  return cachedBlobUrlPromise;
};

export const useResumeUrl = () => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    getBlobUrl().then(setUrl);
  }, []);

  return url;
};
