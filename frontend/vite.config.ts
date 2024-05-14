import react from "@vitejs/plugin-react-swc";
import dotenv from 'dotenv';
import { defineConfig } from "vite";
dotenv.config({path: "../.env"})

export default defineConfig(async ({ mode }) => {
  // process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  await import("./src/env");

  return {
    plugins: [react()],
    envDir: "../.env"
  };
});