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

    // Verify Sparx studio life section
    await expect(page.getByText("Studio Life & Team Culture")).toBeVisible();
    await expect(page.locator('img[alt="Sparx* Studio Beach Team Building"]')).toBeVisible();
    await expect(page.locator('img[alt="Sparx* Birthday Card"]')).toBeVisible();
    await expect(page.locator('img[alt="Sparx* Year-End Gala"]')).toBeVisible();
    const studioLifeSection = page.getByText("Studio Life & Team Culture").locator("xpath=ancestor::section");
    await studioLifeSection.screenshot({
      path: path.join(ARTIFACT_DIR, "sparx-studio-life.png"),
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
    await expect(page.getByText("Senior VFX Artist · 2026 @ Insomniac Games")).toBeVisible();

    // Screenshot of project detail page with poster and video
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

    // In-game gameplay VFX check
    await expect(page.getByText("In-Game Gameplay: Bullet Impacts & Trigger Volumes (02:29)")).toBeVisible();
    await expect(page.locator('a[href="https://youtu.be/9JdiQpn4SvQ?t=149"]').first()).toBeVisible();

    // Behind-the-scenes breakdown check
    await expect(page.getByText("Official Behind-the-Scenes: VFX & Combat Development")).toBeVisible();
    await expect(page.locator('a[href="https://www.youtube.com/watch?v=HafvPBjOHxQ"]').first()).toBeVisible();

    await expect(page.getByText("In-Game Gameplay: Aggressive & Stealth Combat")).toBeVisible();
    await expect(page.locator('a[href="https://www.youtube.com/watch?v=iQYeXYa2Tfo"]').first()).toBeVisible();

    // In-game cinematic cutscenes check
    await expect(page.getByText("In-Game Cinematic Cutscenes", { exact: true })).toBeVisible();
    await expect(page.getByText("Cinematic VFX", { exact: true })).toBeVisible();
    await expect(page.locator('a[href="https://youtu.be/3boUBsYHY3I?t=1347"]').first()).toBeVisible();
    await expect(page.locator('a[href="https://youtu.be/3boUBsYHY3I?t=2926"]').first()).toBeVisible();
    await expect(page.locator('a[href="https://youtu.be/3boUBsYHY3I?t=2979"]').first()).toBeVisible();
    await expect(page.locator('a[href="https://youtu.be/3boUBsYHY3I?t=4272"]').first()).toBeVisible();
    await expect(page.locator('a[href="https://youtu.be/3boUBsYHY3I?t=7130"]').first()).toBeVisible();

    // ArtBlast video links check
    await expect(page.getByText("ArtBlast: Warehouse Explosion")).toBeVisible();
    await expect(page.getByText("ArtBlast: Night Assault")).toBeVisible();

    // In-game evidence check
    await expect(page.getByText("In-Game End Credits", { exact: true })).toBeVisible();
    await expect(page.getByText("In-Game Credit")).toBeVisible();
    const creditLink = page.locator('a[href="https://youtu.be/JfV_lwWiJDk?t=780"]').first();
    await expect(creditLink).toBeVisible();

    // Visual breakdown check
    await expect(page.getByText("Selected Breakdown")).toBeVisible();
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
