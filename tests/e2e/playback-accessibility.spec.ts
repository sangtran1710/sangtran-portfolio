import { expect, test } from "@playwright/test";

test("review proof traps focus, closes with Escape and restores its opener", async ({ page }) => {
  await page.goto("/about", { waitUntil: "networkidle" });
  const opener = page.getByRole("button", { name: "Read client feedback", exact: true }).first();
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  for (let index = 0; index < 4; index += 1) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test("showreel controls follow native playback and keyboard shortcuts", async ({ page }) => {
  await page.goto("/showreel", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /play showreel video/i }).click();
  const video = page.locator("video");
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(false);
  await video.evaluate((element: HTMLVideoElement) => element.pause());
  await expect(page.getByRole("button", { name: "PLAY", exact: true })).toHaveCount(1);
  await page.locator("h1").click();
  await page.keyboard.press("k");
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(false);
  await page.keyboard.press("Space");
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
  await video.evaluate((element: HTMLVideoElement) => { element.muted = true; });
  await expect(page.getByRole("button", { name: "Unmute showreel" })).toHaveAttribute("aria-pressed", "true");
});

test("Wolverine previews stop outside the viewport and preserve manual pause", async ({ page }) => {
  await page.goto("/projects/wolverine", { waitUntil: "networkidle" });
  const clips = page.locator('video[src*="/loops/"]');
  const clip = clips.first();
  await clip.scrollIntoViewIfNeeded();
  await expect.poll(() => clip.evaluate((element: HTMLVideoElement) => element.paused)).toBe(false);
  await expect.poll(() => clips.evaluateAll((elements) => elements.filter((element) => {
    const video = element as HTMLVideoElement;
    const box = video.getBoundingClientRect();
    return !video.paused && (box.bottom <= 0 || box.top >= innerHeight);
  }).length)).toBe(0);
  await clip.locator("..").click();
  await expect.poll(() => clip.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
  await page.evaluate(() => window.scrollTo(0, 0));
  await clip.scrollIntoViewIfNeeded();
  await expect.poll(() => clip.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
});
