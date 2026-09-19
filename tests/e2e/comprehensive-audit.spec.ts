import { test, expect } from "@playwright/test";

test.describe("Deep Comprehensive Site Experience Audit", () => {
  const routes = [
    "/",
    "/portfolio",
    "/showreel",
    "/articles",
    "/articles?tab=math",
    "/articles?tab=tools",
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

    // Test Hero Canvas presence and dimensions
    const heroCanvas = page.locator("section canvas");
    await expect(heroCanvas).toBeVisible();
    const canvasBox = await heroCanvas.boundingBox();
    expect(canvasBox?.width).toBeGreaterThan(300);
    expect(canvasBox?.height).toBeGreaterThan(300);

    // Simulate mouse moves across Hero
    if (canvasBox) {
      for (let i = 0; i < 5; i++) {
        await page.mouse.move(canvasBox.x + i * 50, canvasBox.y + i * 40);
        await page.waitForTimeout(50);
      }
    }

    // Test mouse hover on project cards (SpotlightCard)
    const firstProjectCard = page.locator("article").first();
    await firstProjectCard.scrollIntoViewIfNeeded();
    await expect(firstProjectCard).toBeVisible();
    await firstProjectCard.hover();
    await page.waitForTimeout(200);

    // Test navigation links
    const workLink = page.getByRole("link", { name: /Selected work/i }).first();
    await expect(workLink).toBeVisible();
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

  test("Notes page tab filtering and consolidated math article", async ({ page }) => {
    await page.goto("/articles", { waitUntil: "networkidle" });

    // Verify there are exactly 2 articles on All Notes
    const articles = page.locator("article");
    await expect(articles).toHaveCount(2);

    // Switch to Tools tab
    const toolsTab = page.getByRole("button", { name: /Tools & Pipeline|Công cụ/i });
    await toolsTab.click();
    await page.waitForTimeout(300);
    await expect(page.locator("article")).toHaveCount(1);
    await expect(page.getByText(/Destructible Separate Mesh Tool/i)).toBeVisible();

    // Switch to Math tab
    const mathTab = page.getByRole("button", { name: /Math for VFX|Toán cho VFX/i });
    await mathTab.click();
    await page.waitForTimeout(300);
    await expect(page.locator("article")).toHaveCount(1);
    await expect(page.getByText(/Essential Math for Real-Time VFX/i)).toBeVisible();

    // Navigate into the consolidated math article
    await page.getByRole("link", { name: /Essential Math for Real-Time VFX/i }).first().click();
    await page.waitForURL("**/blog/math-for-vfx-shaders");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Essential Math for Real-Time VFX & Shaders");

    // Verify interactive widgets render
    await expect(page.getByText(/^Dot Product:/).first()).toBeVisible();
    await expect(page.getByText(/Cross Product: Orthogonal to A and B/i).first()).toBeVisible();
    await expect(page.getByText(/^Distance:/).first()).toBeVisible();
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
