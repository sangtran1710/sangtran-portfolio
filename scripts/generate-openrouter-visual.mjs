import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;

  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) continue;

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;

    const key = arg.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    i += 1;
  }
  return args;
}

function usage() {
  console.log(`
Generate a visual asset with OpenRouter.

Usage:
  npm run visual:generate -- --prompt "cinematic teal VFX background" --out public/images/generated/hero-vfx.png

Options:
  --prompt          Required. Text prompt for the visual asset.
  --out             Optional. Output image path. Defaults to public/images/generated/openrouter-visual-<timestamp>.png.
  --model           Optional. Overrides OPENROUTER_IMAGE_MODEL.
  --aspect-ratio    Optional. Passed through as image_config.aspect_ratio when supported by the model.
`);
}

function resolveOutputPath(outArg) {
  if (outArg) {
    return path.resolve(root, outArg);
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return path.join(root, "public", "images", "generated", `openrouter-visual-${stamp}.png`);
}

function getImageDataUrl(message) {
  const image = message?.images?.[0];
  return (
    image?.imageUrl?.url ||
    image?.image_url?.url ||
    image?.url ||
    null
  );
}

function writeDataUrl(dataUrl, outputPath) {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) {
    throw new Error("OpenRouter returned an unsupported image payload. Expected a base64 data URL.");
  }

  const [, mimeType, base64] = match;
  const buffer = Buffer.from(base64, "base64");
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, buffer);

  return { mimeType, bytes: buffer.length };
}

loadEnvFile(path.join(root, ".env.local"));
loadEnvFile(path.join(root, ".env"));

const args = parseArgs(process.argv.slice(2));
if (args.help || !args.prompt) {
  usage();
  process.exit(args.help ? 0 : 1);
}

const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
  console.error("Missing OPENROUTER_API_KEY. Add it to .env.local before running this script.");
  process.exit(1);
}

const model = args.model || process.env.OPENROUTER_IMAGE_MODEL || "openai/gpt-5-image";
const outputPath = resolveOutputPath(args.out);
const body = {
  model,
  messages: [
    {
      role: "system",
      content:
        "Create polished production-ready visual assets for a senior real-time VFX portfolio website. Favor cinematic composition, strong readability, refined lighting, and no text unless explicitly requested.",
    },
    {
      role: "user",
      content: args.prompt,
    },
  ],
  modalities: ["image", "text"],
  stream: false,
};

if (args["aspect-ratio"]) {
  body.image_config = {
    aspect_ratio: args["aspect-ratio"],
  };
}

const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "HTTP-Referer": process.env.OPENROUTER_APP_URL || "https://www.henry-vfx.com/",
    "X-Title": process.env.OPENROUTER_APP_NAME || "Henry VFX Portfolio",
  },
  body: JSON.stringify(body),
});

const resultText = await response.text();
let result;
try {
  result = JSON.parse(resultText);
} catch {
  result = null;
}

if (!response.ok) {
  const message = result?.error?.message || resultText || response.statusText;
  console.error(`OpenRouter request failed (${response.status}): ${message}`);
  process.exit(1);
}

const message = result?.choices?.[0]?.message;
const imageDataUrl = getImageDataUrl(message);
if (!imageDataUrl) {
  console.error("OpenRouter response did not include an image.");
  if (message?.content) {
    console.error(`Model message: ${message.content}`);
  }
  process.exit(1);
}

if (!imageDataUrl.startsWith("data:")) {
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(`${outputPath}.url.txt`, imageDataUrl);
  console.log(`Generated image URL saved to ${path.relative(root, `${outputPath}.url.txt`)}`);
  process.exit(0);
}

const { mimeType, bytes } = writeDataUrl(imageDataUrl, outputPath);
const promptPath = `${outputPath}.prompt.txt`;
writeFileSync(promptPath, `${args.prompt}\n`);

console.log(`Generated visual saved to ${path.relative(root, outputPath)}`);
console.log(`Prompt saved to ${path.relative(root, promptPath)}`);
console.log(`Format: ${mimeType}; Size: ${(bytes / 1024).toFixed(1)} KB`);
