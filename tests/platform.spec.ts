import { test, expect } from "@playwright/test";
test("home, navigation, local previews and responsive layouts", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Your next AI");
  await expect
    .poll(() =>
      page
        .locator(".hero-preview-main img")
        .evaluate((img) => (img as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  await page.locator(".hero-search input").fill("perfume");
  await page.locator(".hero-search button").click();
  await expect(page).toHaveURL(/q=perfume/);
  await expect(page.locator(".prompt-card")).toHaveCount(1);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .locator(".mobile-nav")
    .getByRole("link", { name: "Video Prompts", exact: true })
    .click();
  await expect(page).toHaveURL(/videos/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});
test("library search, sort, filters, empty state and reset", async ({
  page,
}) => {
  await page.goto("/discover");
  await expect(page.locator(".prompt-card")).toHaveCount(36);
  await page
    .locator(".filter-group")
    .getByRole("button", { name: "Video", exact: false })
    .first()
    .click();
  await expect(page.locator(".prompt-card")).toHaveCount(18);
  await page
    .locator(".filter-group")
    .getByRole("button", { name: "Product Ads", exact: true })
    .click();
  await expect(page.locator(".prompt-card")).toHaveCount(2);
  await page.locator(".library-search input").fill("no-such-template");
  await expect(
    page.getByRole("heading", { name: "No prompts found" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Reset filters", exact: true })
    .last()
    .click();
  await expect(page.locator(".prompt-card")).toHaveCount(36);
  await page.locator(".sort-label select").selectOption("az");
  await expect(page.locator(".card-title").first()).toHaveText(
    "A Journey Through Kyoto",
  );
  await page.goto("/images?tool=flow");
  await expect(page.locator(".prompt-card")).toHaveCount(0);
});
test("modal editable copy, favorites persistence and template customization", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/discover");
  await page.locator(".card-title").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .locator(".detail-prompt")
    .fill("An edited cinematic red supercar prompt.");
  await page
    .locator(".detail-actions")
    .getByRole("button", { name: "Copy Prompt" })
    .click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "An edited cinematic red supercar prompt.",
  );
  await page
    .locator(".detail-actions")
    .getByRole("button", { name: "Save to Favorites" })
    .click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.goto("/favorites");
  await expect(page.locator(".prompt-card")).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".prompt-card")).toHaveCount(1);
  await page.locator(".card-title").click();
  await page.getByRole("button", { name: "Customize Prompt" }).click();
  await expect(page).toHaveURL(/generator\?template=template-1/);
  await expect(
    page.getByRole("textbox", { name: "Main subject", exact: true }),
  ).toHaveValue("a sculpted red supercar");
  await expect(page.locator(".output-text")).toContainText("supercar");
});
test("generator validation, live editing, video structure, regeneration and saved prompts", async ({
  page,
}) => {
  await page.goto("/generator");
  await page.getByRole("button", { name: "Generate My Prompt" }).click();
  await expect(page.getByRole("alert")).toContainText("Tell us your idea");
  await page
    .getByRole("textbox", { name: "What do you want to create?" })
    .fill("A luminous futuristic city");
  await page.getByRole("button", { name: "Generate My Prompt" }).click();
  const first = await page.locator(".output-text").inputValue();
  expect(first).toContain("futuristic city");
  expect(first).toContain("--ar 16:9");
  await page
    .getByRole("textbox", { name: "Main subject", exact: true })
    .fill("a silver robot");
  await expect(page.locator(".output-text")).toContainText("a silver robot");
  await page.getByRole("button", { name: "Regenerate", exact: true }).click();
  expect(await page.locator(".output-text").inputValue()).not.toBe(first);
  await page
    .locator(".mode-switch")
    .getByRole("button", { name: "Video prompt", exact: true })
    .click();
  await page
    .getByRole("combobox", { name: "Duration", exact: true })
    .selectOption("15");
  await page.getByLabel("Dialogue or voice-over").fill("Welcome to tomorrow.");
  await expect(page.locator(".output-text")).toContainText("10. Constraints");
  await expect(page.locator(".output-text")).toContainText("15 seconds");
  await page
    .getByRole("combobox", { name: "Prompt language", exact: true })
    .selectOption("uz");
  await expect(page.locator(".output-text")).toContainText("Sahna tavsifi");
  await page
    .getByRole("combobox", { name: "Prompt language", exact: true })
    .selectOption("ru");
  await expect(page.locator(".output-text")).toContainText("Описание сцены");
  await page
    .getByRole("button", { name: "Save to Favorites", exact: true })
    .click();
  await page.goto("/favorites");
  await expect(page.locator(".saved-prompt")).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".saved-prompt")).toHaveCount(1);
  await page.getByRole("button", { name: "Remove", exact: true }).click();
  await expect(page.locator(".saved-prompt")).toHaveCount(0);
  await page.goto("/generator");
  await page
    .getByRole("textbox", { name: "What do you want to create?" })
    .fill("test");
  await page.getByRole("button", { name: "Generate My Prompt" }).click();
  await page.getByRole("button", { name: "Clear", exact: true }).click();
  await expect(page.locator(".output-empty")).toBeVisible();
});
test("tool adaptation, independent language, theme and preferences persistence", async ({
  page,
}) => {
  await page.goto("/tools");
  await page.locator(".tool-card").filter({ hasText: "Google Flow" }).click();
  await expect(page).toHaveURL(/tool=flow/);
  await expect(page.locator(".mode-switch button.active")).toHaveText(
    "Video prompt",
  );
  await page.goto("/settings");
  await page.getByRole("button", { name: "O‘zbekcha" }).click();
  await expect(page.locator("h1")).toHaveText("O‘zingizga moslang.");
  await page.reload();
  await expect(page.locator("h1")).toHaveText("O‘zingizga moslang.");
  await page.getByRole("button", { name: "Kunduzgi" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Русский" }).click();
  await expect(page.locator("h1")).toHaveText("Чувствуйте себя как дома.");
  await page.goto("/generator");
  await expect(page.locator(".language-field select")).toHaveValue("en");
});
