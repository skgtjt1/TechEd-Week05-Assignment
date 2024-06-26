// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        library: resolve(__dirname, "library/index.html"),
        form: resolve(__dirname, "form/index.html"),
      },
    },
  },
});
