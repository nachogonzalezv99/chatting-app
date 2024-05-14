import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
 
export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_GOOGLE_MAPS_API_KEY: z.string().min(1),
    VITE_GOOGLE_MAP_ID: z.string().min(1),
  },
  runtimeEnv: process.env,
});