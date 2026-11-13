import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const routes = [
  "/",
  "/directory/search",
  "/directory/domains",
  "/directory/domains/it-tech",
  "/reunions/upcoming",
  "/career-hub/jobs",
  "/help-desk",
  "/join/auth",
  "/who-we-are/office",
  "/admin",
];

const viewports = [
  { width: 390, height: 844, name: "390px (Mobile)" },
  { width: 1366, height: 768, name: "1366px (Laptop)" },
  { width: 1920, height: 1080, name: "1920px (Desktop)" },
];

async function run() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const results = [];

  const screenshotDir = path.resolve("scripts/screenshots");
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    for (const route of routes) {
      try {
        await page.goto(`http://localhost:3000${route}`, {
          waitUntil: "domcontentloaded",
          timeout: 15000,
        });
        await page.waitForTimeout(600);

        const data = await page.evaluate(() => {
          const docScrollWidth = document.documentElement.scrollWidth;
          const winInnerWidth = window.innerWidth;
          const noOverflow = docScrollWidth <= winInnerWidth;

          const h1 = document.querySelector("h1");
          const h2 = document.querySelector("h2");
          const p = document.querySelector("p");

          const h1Size = h1 ? window.getComputedStyle(h1).fontSize : "N/A";
          const h2Size = h2 ? window.getComputedStyle(h2).fontSize : "N/A";
          const pSize = p ? window.getComputedStyle(p).fontSize : "N/A";

          // Card padding
          const card = document.querySelector(
            "[class*='rounded-xl'], [class*='rounded-2xl'], [class*='bg-card'], [data-event-card]"
          );
          let cardPad = "N/A";
          if (card) {
            const cs = window.getComputedStyle(card);
            cardPad = `${cs.paddingTop}`;
          }

          // Font-family check
          let checkedFont = "N/A";
          let isMono = false;
          const testEl = document.querySelector(
            "a[href^='tel:'], span.tabular-nums, [class*='tabular-nums']"
          );
          if (testEl) {
            checkedFont = window.getComputedStyle(testEl).fontFamily;
            const lower = checkedFont.toLowerCase();
            isMono =
              lower.includes("monospace") ||
              lower.includes("consolas") ||
              lower.includes("courier");
          }

          return {
            noOverflow,
            docScrollWidth,
            winInnerWidth,
            h1Size,
            h2Size,
            pSize,
            cardPad,
            checkedFont,
            isMono,
          };
        });

        results.push({
          viewport: vp.name,
          route,
          ...data,
        });

        if (
          (route === "/" || route === "/directory/domains") &&
          (vp.width === 390 || vp.width === 1366)
        ) {
          const cleanRoute = route === "/" ? "home" : "domains";
          const shotPath = path.join(
            screenshotDir,
            `${cleanRoute}-${vp.width}.png`
          );
          await page.screenshot({ path: shotPath, fullPage: false });
        }
      } catch (err) {
        results.push({
          viewport: vp.name,
          route,
          error: err.message,
        });
      }
    }
    await context.close();
  }

  await browser.close();

  console.log("\n=================== VERIFICATION RESULTS ===================");
  console.table(
    results.map((r) => ({
      Viewport: r.viewport,
      Route: r.route,
      "No Overflow": r.noOverflow,
      "Scroll W": r.docScrollWidth,
      "Inner W": r.winInnerWidth,
      H1: r.h1Size,
      H2: r.h2Size,
      P: r.pSize,
      "Card Pad": r.cardPad,
      "Is Monospace": r.isMono,
    }))
  );

  const overflowFailures = results.filter((r) => r.noOverflow === false);
  const monoFailures = results.filter((r) => r.isMono === true);

  console.log(`Overflow Failures: ${overflowFailures.length}`);
  console.log(`Monospace Violations: ${monoFailures.length}`);
  console.log("============================================================\n");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

