import { test, expect } from "@playwright/test";
import path from "path";

const ARTIFACT_DIR = "C:/Users/ADMIN/.gemini/antigravity/brain/b8d825af-b8ca-4cef-9448-f65b7215d27c";
const MOBY_URL = "https://www.mobygames.com/person/1553845/tran-minh-sang/";

test.describe("MobyGames Credit Verification Audit", () => {
  test("Marvel's Wolverine detail page displays verified MobyGames credits in header, section 5, and footer", async ({ page }) => {
    await page.goto("http://localhost:3000/projects/wolverine");
    await page.waitForLoadState("networkidle");

    // 1. Header action link
    const headerMobyLink = page.locator(`header a[href="${MOBY_URL}"]`);
    await expect(headerMobyLink).toBeVisible();
    await expect(headerMobyLink).toContainText("MobyGames Credit");

    // 2. Section 5 End Credits frame link
    const creditsSection = page.locator('section[aria-label="In-Game Proof & References"]');
    await expect(creditsSection).toBeVisible();
    const sectionMobyLink = creditsSection.locator(`a:has-text("MobyGames Credit")`);
    await expect(sectionMobyLink).toBeVisible();
    await expect(sectionMobyLink).toHaveAttribute("href", MOBY_URL);

    // Screenshot credits frame
    await creditsSection.screenshot({
      path: path.join(ARTIFACT_DIR, "wolverine_mobygames_credits_section.png"),
    });

    // 3. Colophon footer link
    const colophonFooter = page.locator("article footer");
    await expect(colophonFooter).toBeVisible();
    const footerMobyLink = colophonFooter.locator(`a:has-text("Verified on MobyGames")`);
    await expect(footerMobyLink).toBeVisible();
    await expect(footerMobyLink).toHaveAttribute("href", MOBY_URL);

    // Screenshot footer
    await colophonFooter.screenshot({
      path: path.join(ARTIFACT_DIR, "wolverine_mobygames_footer.png"),
    });
  });

  test("Marvel's Spider-Man 2 detail page displays verified MobyGames credits in top bar, evidence card, and footer", async ({ page }) => {
    await page.goto("http://localhost:3000/projects/spider-man-2");
    await page.waitForLoadState("networkidle");

    // 1. Top action bar link
    const topBarMobyLink = page.locator(`article > div:first-child a:has-text("MobyGames Credit")`);
    await expect(topBarMobyLink).toBeVisible();
    await expect(topBarMobyLink).toHaveAttribute("href", MOBY_URL);

    // 2. Evidence breakdown card for Official In-Game End Credits
    const creditsCard = page.locator('figure:has-text("Official In-Game End Credits")');
    await expect(creditsCard).toBeVisible();
    const cardMobyLink = creditsCard.locator(`a:has-text("MobyGames Credit")`);
    await expect(cardMobyLink).toBeVisible();
    await expect(cardMobyLink).toHaveAttribute("href", MOBY_URL);

    // Screenshot Spider-Man 2 credits card
    await creditsCard.screenshot({
      path: path.join(ARTIFACT_DIR, "spiderman2_mobygames_evidence_card.png"),
    });

    // 3. Studio Colophon footer
    const colophonFooter = page.locator("article footer");
    await expect(colophonFooter).toBeVisible();
    const footerMobyLink = colophonFooter.locator(`a:has-text("MobyGames Credit")`);
    await expect(footerMobyLink).toBeVisible();
    await expect(footerMobyLink).toHaveAttribute("href", MOBY_URL);

    // Screenshot footer
    await colophonFooter.screenshot({
      path: path.join(ARTIFACT_DIR, "spiderman2_mobygames_footer.png"),
    });
  });
});
