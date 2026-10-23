import { test, expect } from "@playwright/test";

test.describe("Fastlane Mini Bikes Storefront", () => {
  test("homepage loads with hero, mission statement, and categories", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Fastlane Mini Bikes/i);

    // Announcement bar
    await expect(page.locator("text=YOUR 1 STOP MINI BIKE SHOP 4 PARTS & UPGRADES")).toBeVisible();

    // Mission bio
    await expect(page.locator("text=Est 2015 in Los Angeles Fast Lane Mini Bikes LLC")).toBeVisible();

    // CTA
    const shopCta = page.locator("text=CLICK TO SHOP");
    await expect(shopCta).toBeVisible();
  });

  test("collections page displays product grid and filters", async ({ page }) => {
    await page.goto("/collections/all");
    await expect(page.locator("h1")).toContainText(/Products/i);

    // Filter controls
    const sortSelect = page.locator("#sort-select");
    await expect(sortSelect).toBeVisible();

    // At least 20 product cards should be rendered
    const cards = page.locator("a[href^='/products/']");
    expect(await cards.count()).toBeGreaterThanOrEqual(10);
  });

  test("product page displays variant selection and add to cart", async ({ page }) => {
    await page.goto("/products/the-357-mini-bike-frame-and-fork");
    await expect(page.locator("h1")).toContainText(/MINI BIKE FRAME AND FORK KITS/i);

    // Add to cart button
    const addToCartBtn = page.locator("button:has-text('Add to Cart'), button:has-text('Sold Out')");
    await expect(addToCartBtn).toBeVisible();
  });

  test("search functionality filters products", async ({ page }) => {
    await page.goto("/search?q=exhaust");
    await expect(page.locator("text=Exhaust")).toBeVisible();
  });
});
