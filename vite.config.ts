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

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import path from "path";
import type { IncomingMessage, ServerResponse } from "http";

type ProductPayload = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
};

const readJsonBody = async (req: IncomingMessage): Promise<unknown> =>
  new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });

const writeJson = (res: ServerResponse, statusCode: number, payload: unknown) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
};

const aiMiddleware = (
  openaiApiKey?: string,
  openaiModel?: string,
  aiProvider?: string,
  geminiApiKey?: string,
  geminiModel?: string
) => ({
  name: "ai-middleware",
  configureServer(server: { middlewares: { use: (path: string, fn: (req: IncomingMessage, res: ServerResponse) => Promise<void>) => void } }) {
    server.middlewares.use("/api/ai/stylist", async (req, res) => {
      if (req.method !== "POST") {
        writeJson(res, 405, { error: "Method not allowed" });
        return;
      }

      try {
        const body = (await readJsonBody(req)) as { query?: string; products?: ProductPayload[] };
        const query = body?.query?.trim();
        const products = Array.isArray(body?.products) ? body.products : [];

        if (!query) {
          writeJson(res, 400, { error: "Query is required." });
          return;
        }

        const provider = (aiProvider || "gemini").toLowerCase();
        let rawText = "{}";

        if (provider === "openai") {
          const apiKey = openaiApiKey;
          if (!apiKey) {
            writeJson(res, 500, { error: "OPENAI_API_KEY is missing in environment variables." });
            return;
          }

          const model = openaiModel || "gpt-4.1-mini";
          const response = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model,
              input: [
                {
                  role: "system",
                  content:
                    "You are a fashion e-commerce assistant. Return only valid JSON with keys: answer (string), recommendedProductIds (string[]). Keep answer short.",
                },
                {
                  role: "user",
                  content: `Customer request: ${query}\n\nCatalog:\n${JSON.stringify(products)}`,
                },
              ],
            }),
          });

          if (!response.ok) {
            const details = await response.text();
            writeJson(res, response.status, { error: "OpenAI request failed", details });
            return;
          }

          const data = (await response.json()) as { output_text?: string };
          rawText = data.output_text ?? "{}";
        } else {
          const apiKey = geminiApiKey;
          if (!apiKey) {
            writeJson(res, 500, { error: "GEMINI_API_KEY is missing in environment variables." });
            return;
          }

          const model = geminiModel || "gemini-2.0-flash";
          const prompt = [
            "You are a fashion e-commerce assistant.",
            "Return only valid JSON with keys: answer (string), recommendedProductIds (string[]).",
            "Keep answer short.",
            `Customer request: ${query}`,
            `Catalog: ${JSON.stringify(products)}`,
          ].join("\n\n");

          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
              }),
            }
          );

          if (!response.ok) {
            const details = await response.text();
            writeJson(res, response.status, { error: "Gemini request failed", details });
            return;
          }

          const data = (await response.json()) as {
            candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
          };
          rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
        }

        let parsed: { answer?: string; recommendedProductIds?: string[] } = {};
        try {
          parsed = JSON.parse(rawText);
        } catch {
          parsed = { answer: rawText, recommendedProductIds: [] };
        }

        writeJson(res, 200, {
          answer: parsed.answer ?? "I found a few matches for you.",
          recommendedProductIds: Array.isArray(parsed.recommendedProductIds) ? parsed.recommendedProductIds : [],
        });
      } catch (error) {
        writeJson(res, 500, {
          error: "Failed to generate AI recommendations.",
          details: error instanceof Error ? error.message : "Unknown error",
        });
      }
    });
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      tailwind(),
      react(),
      aiMiddleware(
        env.OPENAI_API_KEY,
        env.OPENAI_MODEL,
        env.AI_PROVIDER,
        env.GEMINI_API_KEY,
        env.GEMINI_MODEL
      ),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  };
});
