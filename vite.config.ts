import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
    },
    dedupe: ["react", "react-dom", "@tanstack/react-query"],
  },
  css: {
    transformer: "lightningcss",
  },
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
      server: { entry: "server" },
    }),
    nitro({
      preset: "vercel",
      serverAssets: [
        {
          baseName: "resume",
          dir: "./src/assets",
          pattern: "shadab-resume.pdf",
        },
      ],
    }),
    viteReact(),
  ],
});
