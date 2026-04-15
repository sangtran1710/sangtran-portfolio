import { expect, test } from "@playwright/test";
import path from "node:path";

const screenshotDir = path.join(process.cwd(), "test-results", "ui-screenshots");

async function dismissLoader(page: import("@playwright/test").Page) {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /skip/i }).click({ timeout: 5_000 }).catch(() => {});
  await page.waitForTimeout(400);
}

test.describe("UI screenshot QA", () => {
  test("captures required desktop and mobile review screens", async ({ page }, testInfo) => {
    const isMobile = testInfo.project.name.includes("mobile");

    await dismissLoader(page);

    if (isMobile) {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(screenshotDir, "home-mobile.png"),
      });
      return;
    }

    const shots = [
      { route: "/", selector: "section:first-of-type", name: "home-hero-desktop" },
      { route: "/", selector: "#work", name: "home-work-desktop" },
      { route: "/", selector: "#profile", name: "home-profile-desktop" },
      { route: "/portfolio", selector: "main section:first-of-type", name: "portfolio-intro-desktop" },
      { route: "/portfolio", selector: "article:first-of-type", name: "portfolio-card-desktop" },
      { route: "/about", selector: "main > div", name: "about-desktop" },
      { route: "/about", selector: "#featured-credits", name: "about-credits-desktop" },
    ];

    for (const shot of shots) {
      await page.goto(shot.route, { waitUntil: "networkidle" });
      const locator = page.locator(shot.selector).first();
      await locator.scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      await page.screenshot({
        path: path.join(screenshotDir, `${shot.name}.png`),
      });
    }
  });

  test("project cards keep long copy outside thumbnails", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes("mobile"), "Desktop layout guard only.");

    await dismissLoader(page);
    await page.goto("/portfolio", { waitUntil: "networkidle" });

    const firstCard = page.locator("article").first();
    await expect(firstCard).toBeVisible();

    const imageRegion = firstCard.locator(".aspect-\\[16\\/10\\]").first();
    const description = firstCard.locator("p").filter({
      hasText: /developed|created|contributed|playable/i,
    }).first();

    await expect(imageRegion).toBeVisible();
    await expect(description).toBeVisible();

    const imageBox = await imageRegion.boundingBox();
    const descriptionBox = await description.boundingBox();

    expect(imageBox, "Project card image region should have a layout box.").not.toBeNull();
    expect(descriptionBox, "Project card description should have a layout box.").not.toBeNull();

    expect(descriptionBox!.y).toBeGreaterThan(imageBox!.y + imageBox!.height - 1);
  });
});
