// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwind from "@tailwindcss/vite";

// export default defineConfig({
//   plugins: [tailwind(), react()],
//   server: {
//     port: 3000,
//     open: true,
//     historyApiFallback: true,
//   },
// });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwind from "@tailwindcss/vite";
// import path from "path";

// export default defineConfig({
//   plugins: [tailwind(), react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   server: {
//     port: 3000,
//     open: true,
//     historyApiFallback: true,
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [tailwind(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
