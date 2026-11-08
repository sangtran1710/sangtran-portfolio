import { expect, test } from "@playwright/test";

test("study stays visible while its replacement images load and latest selection wins", async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => { release = resolve; });
  await page.route("**/assets/blog/destructible-separate-mesh-tool/*.webp", async (route) => {
    await gate;
    await route.continue();
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const section = page.locator("#technical-spotlight");
  await section.getByRole("tab", { name: "Fracture cleanup (Blender)" }).click();
  await page.waitForTimeout(500);
  await expect(section.getByRole("heading", { name: "One crack, three textures" })).toBeVisible();
  await section.getByRole("tab", { name: "Crack bake (Houdini COPs)" }).click();
  release();
  await expect(section.getByRole("tab", { name: "Crack bake (Houdini COPs)" })).toHaveAttribute("aria-selected", "true");
  await section.getByRole("tab", { name: "Fracture cleanup (Blender)" }).click();
  await expect(section.getByRole("heading", { name: "From heavy mesh to light emitters" })).toBeVisible();
});

test("project thumbnails provide static responsive sources and a preview while loading", async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => { release = resolve; });
  await page.route("**/images/thumbnails/*.webp", async (route) => {
    await gate;
    await route.continue();
  });
  await page.goto("/portfolio", { waitUntil: "domcontentloaded" });
  const card = page.locator('a[href="/projects/wolverine"]').first();
  await expect(card.locator("img")).toHaveAttribute("srcset", /480w.*960w.*1440w/);
  await expect(card.locator("[data-thumbnail-preview]")).toHaveCSS("background-image", /data:image/);
  await expect(card.locator("[data-thumbnail-preview]")).toBeVisible();
  await expect(card.locator("img")).toHaveCSS("opacity", "0");
  release();
  await expect(card.locator("img")).toHaveCSS("opacity", "1");
  expect(await card.locator("img").evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
});

test("failed replacement keeps the current study available", async ({ page }) => {
  await page.route("**/assets/blog/destructible-separate-mesh-tool/*.webp", (route) => route.abort());
  await page.goto("/", { waitUntil: "networkidle" });
  const section = page.locator("#technical-spotlight");
  await section.getByRole("tab", { name: "Fracture cleanup (Blender)" }).click();
  await expect(section.getByRole("status")).toContainText("try again");
  await expect(section.getByRole("heading", { name: "One crack, three textures" })).toBeVisible();
  await expect(section.getByRole("tab", { name: "Crack bake (Houdini COPs)" })).toHaveAttribute("aria-selected", "true");
});
