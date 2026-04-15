import path from "node:path";

import { expect, test } from "@playwright/test";

const screenshotDir = path.join(process.cwd(), "test-results", "ui-screenshots");

async function openRoute(page: import("@playwright/test").Page, route: string) {
  await page.goto(route, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

test.describe("UI screenshot QA", () => {
  test("captures desktop and mobile review screens", async ({ page }, testInfo) => {
    const isMobile = testInfo.project.name.includes("mobile");

    if (isMobile) {
      const mobileShots = [
        { route: "/", name: "home-mobile" },
        { route: "/learn", name: "library-mobile" },
      ];

      for (const shot of mobileShots) {
        await openRoute(page, shot.route);
        await page.screenshot({
          path: path.join(screenshotDir, `${shot.name}.png`),
          fullPage: true,
        });
      }

      return;
    }

    const desktopShots = [
      { route: "/", selector: "section:has(h1:text('Read less. Recall more.'))", name: "home-hero-desktop" },
      { route: "/", selector: "section:has(h2:text('Shader Systems is the center of the product now.'))", name: "home-core-track-desktop" },
      { route: "/learn", selector: "#overview", name: "library-overview-desktop" },
      { route: "/learn", selector: "#pillars", name: "library-taxonomy-desktop" },
      { route: "/learn/start-here", selector: "#overview", name: "start-here-overview-desktop" },
      { route: "/learn/start-here", selector: "#build-flow", name: "start-here-build-flow-desktop" },
      { route: "/learn/shaders", selector: "#overview", name: "shaders-topic-overview-desktop" },
      { route: "/learn/shaders", selector: "#foundations", name: "shaders-foundations-desktop" },
      { route: "/learn/shaders", selector: "#optimization", name: "shaders-optimization-desktop" },
      { route: "/practice", selector: "div:has(h1:text('Randomized active recall for every topic track.'))", name: "practice-hub-desktop" },
      { route: "/practice/shaders", selector: "main section.panel", name: "practice-session-desktop" },
    ];

    for (const shot of desktopShots) {
      await openRoute(page, shot.route);
      const locator = page.locator(shot.selector).first();
      await expect(locator).toBeVisible();
      await locator.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await locator.screenshot({
        path: path.join(screenshotDir, `${shot.name}.png`),
      });
    }
  });

  test("desktop learn pages keep sticky navigation visible", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes("mobile"), "Desktop layout guard only.");

    await openRoute(page, "/learn");

    const sidebar = page.locator("aside .sticky").first();
    await expect(sidebar).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, 2200));
    await page.waitForTimeout(400);

    const sidebarBox = await sidebar.boundingBox();
    expect(sidebarBox, "Sticky library navigation should keep a layout box on scroll.").not.toBeNull();
    expect(sidebarBox!.y, "Sticky library navigation should remain near the top while scrolling.").toBeLessThan(180);
  });

  test("desktop knowledge cards keep copy inside their own cards", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes("mobile"), "Desktop layout guard only.");

    await openRoute(page, "/learn");

    const firstPillar = page.locator("#foundations article").first();
    await expect(firstPillar).toBeVisible();

    const heading = firstPillar.getByRole("heading").first();
    const summary = firstPillar.locator("p").filter({ hasText: /shader|vector|effect|code|pattern/i }).first();

    const cardBox = await firstPillar.boundingBox();
    const headingBox = await heading.boundingBox();
    const summaryBox = await summary.boundingBox();

    expect(cardBox, "The first knowledge card should have a layout box.").not.toBeNull();
    expect(headingBox, "Knowledge card heading should have a layout box.").not.toBeNull();
    expect(summaryBox, "Knowledge card summary should have a layout box.").not.toBeNull();

    expect(summaryBox!.y).toBeGreaterThan(headingBox!.y);
    expect(summaryBox!.y + summaryBox!.height).toBeLessThan(cardBox!.y + cardBox!.height + 1);
  });

  test("mobile pages avoid horizontal overflow", async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes("mobile"), "Mobile guard only.");

    for (const route of ["/", "/learn", "/learn/start-here"]) {
      await openRoute(page, route);

      const widths = await page.evaluate(() => ({
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));

      expect(
        widths.scrollWidth,
        `Route ${route} should not introduce horizontal overflow on mobile.`,
      ).toBeLessThanOrEqual(widths.innerWidth + 1);
    }
  });
});
