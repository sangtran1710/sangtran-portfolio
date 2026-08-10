import { expect, test } from "@playwright/test";

function numericValue(text: string | null) {
  const value = text?.match(/-?\d+(?:\.\d+)?/)?.[0];
  return value ? Number(value) : Number.NaN;
}

test.describe("Audit regressions", () => {
  test("math demos cover a useful animated range", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes("mobile"), "One animation sample is sufficient.");

    await page.goto("/blog/math-dot-product", { waitUntil: "networkidle" });
    const dotValue = page.getByText(/^Dot Product:/).first();
    await dotValue.scrollIntoViewIfNeeded();

    const dotSamples: number[] = [];
    for (let index = 0; index < 16; index += 1) {
      dotSamples.push(numericValue(await dotValue.textContent()));
      await page.waitForTimeout(300);
    }

    expect(Math.min(...dotSamples)).toBeLessThan(-0.8);
    expect(Math.max(...dotSamples)).toBeGreaterThan(0.8);

    await page.goto("/blog/math-spatial-masks", { waitUntil: "networkidle" });
    const distanceValue = page.getByText(/^Distance:/).first();
    const maskValue = page.getByText(/^Mask Value:/).first();
    await distanceValue.scrollIntoViewIfNeeded();

    const distanceSamples: number[] = [];
    const maskSamples: number[] = [];
    for (let index = 0; index < 12; index += 1) {
      distanceSamples.push(numericValue(await distanceValue.textContent()));
      maskSamples.push(numericValue(await maskValue.textContent()));
      await page.waitForTimeout(300);
    }

    expect(Math.max(...distanceSamples) - Math.min(...distanceSamples)).toBeGreaterThan(70);
    expect(Math.max(...maskSamples)).toBeGreaterThan(0.7);
  });

  test("primary pages expose clear headings and contact actions", async ({ page }) => {
    await page.goto("/showreel", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Showreel");

    await page.goto("/contact", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Contact");
    await expect(page.locator("main").getByRole("link", { name: /sangminhtran1710@gmail.com/ })).toHaveAttribute(
      "href",
      /^mailto:/,
    );
    await expect(page).toHaveTitle(/Contact/);
  });

  test("home contact callout is not duplicated by the footer", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.locator("#contact").scrollIntoViewIfNeeded();

    await expect(page.locator('a[href^="mailto:"]')).toHaveCount(1);
    await expect(page.locator("footer")).not.toContainText("sangminhtran1710@gmail.com");
    await expect(page.locator('[aria-label="Footer navigation"]')).toBeVisible();
  });

  test("desktop hero typography and navigation share one visual grid", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes("mobile"), "Desktop navigation is replaced by the mobile menu.");

    await page.goto("/", { waitUntil: "networkidle" });
    const nav = page.getByRole("navigation", { name: "Primary navigation" });
    await expect(nav.getByRole("link")).toHaveText(["Home", "Work", "Showreel", "Notes", "About", "Contact"]);

    const visualSystem = await page.evaluate(() => {
      const header = document.querySelector("header");
      const logo = header?.querySelector("a");
      const heading = document.querySelector("h1");

      return {
        headerBackground: header ? getComputedStyle(header).backgroundColor : "",
        headingFont: heading ? getComputedStyle(heading).fontFamily : "",
        headingSize: heading ? Number.parseFloat(getComputedStyle(heading).fontSize) : 0,
        logoLeft: logo?.getBoundingClientRect().left ?? 0,
        headingLeft: heading?.getBoundingClientRect().left ?? 0,
      };
    });

    expect(visualSystem.headerBackground).toBe("rgb(11, 14, 18)");
    expect(visualSystem.headingFont).toContain("Kanit");
    expect(visualSystem.headingSize).toBeLessThanOrEqual(80);
    expect(Math.abs(visualSystem.logoLeft - visualSystem.headingLeft)).toBeLessThan(1);
  });

  test("personal Erlangmon VFX project is linked and has a local showcase", async ({ page }) => {
    await page.goto("/portfolio", { waitUntil: "networkidle" });

    const projectLink = page.getByRole("link", { name: /Erlangmon VFX/i });
    await expect(projectLink).toBeVisible();
    await expect(projectLink).toHaveAttribute("href", "/rnd/erlangmon-vfx");

    await page.goto("/rnd/erlangmon-vfx", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1, name: "Erlangmon VFX" })).toBeVisible();
    await expect(page.locator("video")).toHaveAttribute(
      "poster",
      "/projects/erlangmon-vfx/poster.jpg",
    );
    await expect(page.locator('video source[type="video/mp4"]')).toHaveAttribute(
      "src",
      "/projects/erlangmon-vfx/showcase.mp4",
    );
    await expect(page.getByRole("link", { name: "Watch on YouTube" })).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=-Fa3KLNeicA&t=17s",
    );
    await expect(page.getByRole("heading", { name: "Technical decisions" })).toBeVisible();
  });
});
