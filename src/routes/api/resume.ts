import { createFileRoute } from "@tanstack/react-router";
import { useStorage } from "nitro/storage";

const RESUME_FILE_NAME = "shadab-resume.pdf";
const DOWNLOAD_FILE_NAME = "Shadab_Jamadar_Resume.pdf";

export const Route = createFileRoute("/api/resume")({
  server: {
    handlers: {
      GET: async () => {
        let resumePdf: any = null;
        let metadata: any = {};

        try {
          const resumeAssets = useStorage("assets:resume");
          [resumePdf, metadata] = await Promise.all([
            resumeAssets.getItemRaw(RESUME_FILE_NAME),
            resumeAssets.getMeta(RESUME_FILE_NAME),
          ]);
        } catch (e) {
          // Log error but continue to filesystem fallback
          console.warn("Storage warning (expected in development):", e);
        }

        // Fallback to direct filesystem read in development/stubbed environment
        if (!resumePdf) {
          try {
            const fs = await import("node:fs/promises");
            const path = await import("node:path");
            const filePath = path.resolve("./src/assets", RESUME_FILE_NAME);
            resumePdf = await fs.readFile(filePath);

            const stats = await fs.stat(filePath);
            metadata = {
              type: "application/pdf",
              mtime: stats.mtime.toISOString(),
            };
          } catch (fsError) {
            console.error("Filesystem fallback error:", fsError);
          }
        }

        if (!resumePdf) {
          return new Response("Resume PDF not found", {
            status: 404,
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "Cache-Control": "no-store",
            },
          });
        }

        return new Response(resumePdf as BodyInit, {
          status: 200,
          headers: {
            "Content-Type": String(metadata.type || "application/pdf"),
            "Content-Disposition": `inline; filename="${DOWNLOAD_FILE_NAME}"`,
            "Cache-Control": "private, max-age=3600",
            ...(metadata.etag ? { ETag: String(metadata.etag) } : {}),
            ...(metadata.mtime
              ? { "Last-Modified": new Date(String(metadata.mtime)).toUTCString() }
              : {}),
          },
        });
      },
    },
  },
});