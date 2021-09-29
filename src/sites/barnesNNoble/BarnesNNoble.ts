import puppeteer from 'puppeteer';
import { urls, selectors } from './references'

async function start(): Promise<void> {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: { height: 1080, width: 1920 }});
  const page = await browser.newPage();
  await page.goto(`${urls.homepage}`, { waitUntil: "domcontentloaded"});
  await page.hover(selectors.myAccountDropdown)

  const [signInBtn] = await page.$x(selectors.signInBtn);
  await signInBtn.click()
  await page.waitForSelector(selectors.emailUsername);
  // await page.keyboard.type("email@email.com", { delay: 100 })
  // await page.keyboard.type("email@email.com", { delay: 100 })

  await page.screenshot({ path: `puppeteerDownloads/screenshot${new Date()}.png`})

  await browser.close()
}

start();