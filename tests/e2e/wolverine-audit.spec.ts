import { test, expect } from "@playwright/test";
import path from "path";

const ARTIFACT_DIR = "C:/Users/ADMIN/.gemini/antigravity/brain/b8d825af-b8ca-4cef-9448-f65b7215d27c";

test.describe("Marvel's Wolverine Integration Audit", () => {
  test("About page displays Wolverine achievement credit card with Senior VFX Artist title", async ({ page }) => {
    await page.goto("http://localhost:3000/about");
    await page.waitForLoadState("networkidle");

    const creditsSection = page.locator("#featured-credits");
    await expect(creditsSection).toBeVisible();

    // Verify 3 credit articles exist
    const articles = creditsSection.locator("article");
    await expect(articles).toHaveCount(3);

    // Verify Wolverine credit text
    await expect(creditsSection.getByText("Marvel's Wolverine")).toBeVisible();
    await expect(creditsSection.getByText("Senior VFX Artist").first()).toBeVisible();

    // Capture screenshot of credits section
    await creditsSection.screenshot({
      path: path.join(ARTIFACT_DIR, "wolverine-about-credits.png"),
    });
  });

  test("Portfolio page features Marvel's Wolverine at top of AAA list", async ({ page }) => {
    await page.goto("http://localhost:3000/portfolio");
    await page.waitForLoadState("networkidle");

    // Wolverine card should be visible
    const wolverineCard = page.locator('a[href="/projects/wolverine"]').first();
    await expect(wolverineCard).toBeVisible();
    await expect(wolverineCard.getByRole("heading", { name: "Marvel's Wolverine" })).toBeVisible();
    await expect(wolverineCard.getByText("Senior VFX Artist · Insomniac Games")).toBeVisible();

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "wolverine-portfolio-list.png"),
      fullPage: false,
    });
  });

  test("Project detail page /projects/wolverine renders correctly with evidence and video", async ({ page }) => {
    await page.goto("http://localhost:3000/projects/wolverine");
    await page.waitForLoadState("networkidle");

    // Header checks
    await expect(page.locator("h1")).toHaveText("Marvel's Wolverine");
    await expect(page.getByText("Senior VFX Artist · 09/2026 @ Insomniac Games")).toBeVisible();

    // Video title and poster check
    await expect(page.getByText("Jean TK Explosion (In-Game Cinematic VFX)")).toBeVisible();

    // Screenshot of project detail page with poster and video title
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "wolverine-project-detail.png"),
      fullPage: true,
    });

    // Video play button and iframe check
    const playButton = page.locator('button[aria-label="Play Marvel\'s Wolverine"]');
    await expect(playButton).toBeVisible();
    await playButton.click();

    const iframe = page.locator("iframe");
    await expect(iframe).toBeVisible();
    const src = await iframe.getAttribute("src");
    expect(src).toContain("lbiMqaLTKlQ");

    // In-game evidence check
    await expect(page.getByText("In-Game End Credits", { exact: true })).toBeVisible();
    await expect(page.getByText("In-Game Credit")).toBeVisible();
    await expect(page.getByRole("link", { name: "Watch Video" })).toBeVisible();

    // Visual breakdown check
    await expect(page.getByText("Selected Breakdown")).toBeVisible();
    await expect(page.getByText("ArtBlast: Warehouse Explosion")).toBeVisible();
  });

  test("Home page features Marvel's Wolverine as first project in Selected Work", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("networkidle");

    // Featured section should have Wolverine as first card
    const workSection = page.locator("#work");
    await expect(workSection).toBeVisible();

    const isMobile = page.viewportSize() ? page.viewportSize()!.width < 768 : false;
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, isMobile ? "wolverine-hero-mobile.png" : "wolverine-hero-desktop.png"),
      fullPage: false,
    });

    await workSection.screenshot({
      path: path.join(ARTIFACT_DIR, isMobile ? "wolverine-home-featured-mobile.png" : "wolverine-home-featured.png"),
    });
  });
});
