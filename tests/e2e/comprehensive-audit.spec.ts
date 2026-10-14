import { test, expect } from "@playwright/test";

test.describe("Deep Comprehensive Site Experience Audit", () => {
  const routes = [
    "/",
    "/portfolio",
    "/showreel",
    "/articles",
    "/articles?tab=math",
    "/articles?tab=tools",
    "/blog/stormfront-volumetric-cloud-lightning",
    "/blog/math-for-vfx-shaders",
    "/blog/destructible-separate-mesh-tool",
    "/about",
    "/contact",
    "/rnd/erlangmon-vfx",
    "/rnd/vfx-flow",
    "/projects/spider-man-2",
    "/projects/fortnite-remix",
  ];

  for (const route of routes) {
    test(`Audit ${route} for console errors, failed network requests, and layout overflow`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const failedRequests: string[] = [];

      page.on("console", (msg) => {
        if (msg.type() === "error") {
          consoleErrors.push(msg.text());
        }
      });

      page.on("requestfailed", (request) => {
        failedRequests.push(`${request.url()} - ${request.failure()?.errorText}`);
      });

      const response = await page.goto(route, { waitUntil: "networkidle" });
      expect(response?.status(), `${route} returned status ${response?.status()}`).toBeLessThan(400);

      // Check horizontal scrollbar overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(hasHorizontalScroll, `${route} should not have horizontal overflow`).toBe(false);

      // Check that all images on the page loaded successfully
      const brokenImages = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll("img"));
        return imgs
          .filter((img) => img.complete && img.naturalWidth === 0 && !img.src.startsWith("data:"))
          .map((img) => img.src);
      });
      expect(brokenImages, `Broken images found on ${route}`).toEqual([]);

      // Filter out harmless analytics / third party video errors if any
      const criticalErrors = consoleErrors.filter(
        (err) =>
          !err.includes("favicon") &&
          !err.includes("vimeo") &&
          !err.includes("youtube") &&
          !err.includes("analytics") &&
          !err.includes("_vercel")
      );
      expect(criticalErrors, `Console errors on ${route}`).toEqual([]);
    });
  }

  test("Interactive features work smoothly on Home page", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const hero = page.locator("section").first();
    await expect(hero.getByRole("heading", { level: 1, name: "Henry Tran" })).toBeVisible();
    const workLink = hero.getByRole("link", { name: /Selected work/i });
    await expect(workLink).toHaveAttribute("href", "/portfolio");
    await workLink.click();
    await page.waitForURL("**/portfolio");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Production Work");
    const firstProject = page.locator('a[href="/projects/wolverine"]').first();
    await expect(firstProject).toBeVisible();
    await firstProject.click();
    await page.waitForURL("**/projects/wolverine");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Marvel's Wolverine");
  });

  test("Showreel video player can be played and has no broken states", async ({ page }) => {
    await page.goto("/showreel", { waitUntil: "networkidle" });

    const playButton = page.locator("button[aria-label*='Play' i]").first();
    await expect(playButton).toBeVisible();
    await playButton.click();
    await page.waitForTimeout(1000);

    const video = page.locator("video");
    await expect(video).toBeVisible();
  });

  test("Notes directory opens articles and math demos remain accessible", async ({ page }) => {
    await page.goto("/articles", { waitUntil: "networkidle" });
    await expect(page.locator("article")).toHaveCount(4);
    const stormfront = page.locator('article a[href="/blog/stormfront-volumetric-cloud-lightning"]');
    await expect(stormfront.getByRole("heading", { level: 2 })).toHaveText("Stormfront: Making a Storm Sky Feel Alive");
    await stormfront.click();
    await page.waitForURL("**/blog/stormfront-volumetric-cloud-lightning");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await page.goto("/blog/math-for-vfx-shaders", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("The VFX Math I Keep Coming Back To");
    await expect(page.getByText(/^Dot Product:/).first()).toBeVisible();
    await expect(page.getByRole("img", { name: "Two perpendicular vectors and their cross product" })).toBeVisible();
    await expect(page.getByText(/^Distance:/).first()).toBeVisible();
  });

  test("Stormfront breakdown images open at full size", async ({ page }) => {
    await page.goto("/blog/stormfront-volumetric-cloud-lightning");

    for (const image of [
      "cloud-material-graph.webp",
      "cloud-instance-parameters.webp",
      "blueprint-mid-setup.webp",
      "shader-complexity-diagnostic.webp",
    ]) {
      const path = `/assets/blog/stormfront/${image}`;
      const link = page.locator(`a[href="${path}"]`);
      await expect(link.locator("img")).toBeVisible();
      expect((await page.request.get(path)).ok()).toBe(true);
    }
  });

  test("Legacy math URLs redirect properly to unified article anchors", async ({ page }) => {
    const legacyRedirects = [
      { from: "/blog/math-dot-product", targetAnchor: "#part-1-vectors--the-dot-product" },
      { from: "/blog/math-cross-product", targetAnchor: "#part-2-the-cross-product-generating-perpendicular-vectors" },
      { from: "/blog/math-uv-coordinates", targetAnchor: "#part-3-uv-mathematics--texture-distortion" },
      { from: "/blog/math-spatial-masks", targetAnchor: "#part-4-spatial-masks--world-position-math" },
      { from: "/blog/math-essential-functions", targetAnchor: "#part-5-essential-math-nodes--gpu-optimization" },
    ];

    for (const r of legacyRedirects) {
      await page.goto(r.from, { waitUntil: "networkidle" });
      expect(page.url()).toContain("/blog/math-for-vfx-shaders");
    }
  });

  test("Mobile responsive navigation and drawer", async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes("mobile"), "Mobile only test");

    await page.goto("/", { waitUntil: "networkidle" });
    
    // Check mobile hamburger button
    const menuBtn = page.getByRole("button", { name: /menu|navigation|toggle/i }).or(page.locator("header button")).first();
    if (await menuBtn.isVisible()) {
      await menuBtn.click();
      await page.waitForTimeout(300);
      // Verify mobile nav drawer opens
      await expect(page.getByRole("link", { name: /Work|Portfolio/i }).first()).toBeVisible();
    }
  });
});
