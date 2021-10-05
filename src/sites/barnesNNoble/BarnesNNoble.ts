import puppeteer from 'puppeteer';
import { urls, selectors } from './references'

async function start(): Promise<void> {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: { height: 1080, width: 1920 }});
  const page = await browser.newPage();
  await page.goto(`${urls.homepage}`, { waitUntil: "domcontentloaded"});
  await page.hover(selectors.myAccountDropdown)

  const [signInBtn] = await page.$x(selectors.signInBtn);
  await signInBtn.click()
  await page.waitForSelector('body > div.modal > div');
  const elementHandle = await page.$('body > div.modal > div > iframe');
  const iframe = await elementHandle?.contentFrame()

  if (iframe) {
    await iframe.waitForSelector(selectors.emailUsername);
    // puppeteer is delayed in focusing on selector and is occasionally missing the first few characters when typing
    await iframe.focus(selectors.emailUsername);
    await iframe.type(selectors.emailUsername, "testing", { delay: 150 })
    // await iframe.focus(selectors.emailUsername);
    await iframe.type(selectors.password, "123four", { delay: 100 })
    await page.screenshot({ path: `puppeteerDownloads/screenshot${new Date()}BandN.png`})
  }

  await browser.close()
}

start();