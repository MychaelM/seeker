import puppeteer from 'puppeteer';
import { urls, selectors, creds } from './references'

async function start(): Promise<void> {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: { height: 1080, width: 1920 }});
  const page = await browser.newPage();
  await page.goto(`${urls.homepage}`, { waitUntil: "domcontentloaded"});

  // Homepage
  await page.hover(selectors.myAccountDropdown)
  const [signInBtn] = await page.$x(selectors.signInBtn);
  await signInBtn.click()
  await page.waitForSelector(selectors.signInDiv);
  const elementHandle = await page.$(selectors.iframeElHandle);
  const iframe = await elementHandle?.contentFrame()

  // Login iframe
  if (iframe) {
    await iframe.waitForSelector(selectors.emailUsername);
    // puppeteer is delayed in focusing on selector and is occasionally misses the first few characters when typing
    await iframe.click(selectors.emailUsername);
    await iframe.type(selectors.emailUsername, creds.loginUsername, { delay: 150 })
    await iframe.type(selectors.password, creds.loginPassword, { delay: 100 })

    await iframe.click(selectors.loginBtn)
  } else {
    throw new Error("Could not find the correct iframe");
  }

  await page.waitForXPath('//a[contains(text(), "Hi, ")]');
  await page.click(selectors.wishlistBtn);

  // Wishlists Page
  await page.waitForXPath('//h1[contains(., "Your Wishlists")]')

  await page.screenshot({ path: `puppeteerDownloads/screenshot${new Date()}BandN.png`})
  
  await browser.close()
}

start();