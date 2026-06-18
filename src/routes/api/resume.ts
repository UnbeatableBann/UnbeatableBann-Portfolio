import { createFileRoute } from "@tanstack/react-router";
import resumePdf from "@/assets/shadab-resume.pdf";
import fs from "node:fs";
import path from "node:path";

export const Route = createFileRoute("/api/resume")({
  server: {
    handlers: {
      GET: async () => {
        // Serve binary content directly in development to avoid local file path redirection issues
        if (
          process.env.NODE_ENV === "development" ||
          resumePdf.startsWith("/@fs") ||
          resumePdf.includes("src/assets")
        ) {
          try {
            const filePath = path.resolve(process.cwd(), "src/assets/shadab-resume.pdf");
            const fileBuffer = fs.readFileSync(filePath);
            return new Response(fileBuffer, {
              status: 200,
              headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": 'inline; filename="Shadab_Jamadar_Resume.pdf"',
              },
            });
          } catch (err) {
            console.error("Error reading PDF file in dev:", err);
          }
        }

        // Production: Redirect to the compiled, hashed public static asset
        return new Response(null, {
          status: 302,
          headers: {
            Location: resumePdf,
          },
        });
      },
    },
  },
});
