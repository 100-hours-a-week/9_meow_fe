import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // 개발용 서버 포트 및 프록시 설정
  server: {
    port: 4173,
    proxy: {
      // /api 로 시작하는 요청은 백엔드(8080)로
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      // /api/infer 로 시작하는 요청은 AI 서버(8000)로
      "/api/infer": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },

  // `npm run preview` 시에도 동일한 포트·프록시를 사용하도록
  preview: {
    port: 4173,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/api/infer": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },

  // CI 빌드 아웃풋 설정
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
