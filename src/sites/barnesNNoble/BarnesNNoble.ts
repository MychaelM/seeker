import puppeteer from 'puppeteer';
import { buildWishlistItem } from './helpers/wishlistItem';
import { urls, selectors, creds, xpaths } from './references'

async function start(): Promise<void> {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: { height: 1080, width: 1920 }});
  const page = await browser.newPage();
  await page.goto(`${urls.homepage}`, { waitUntil: "domcontentloaded"});

  // Homepage
  await page.hover(selectors.myAccountDropdown)
  const [signInBtn] = await page.$x(selectors.signInBtn);
  await signInBtn.click();
  await page.waitForSelector(selectors.signInDiv);
  const elementHandle = await page.$(selectors.iframeElHandle);
  const iframe = await elementHandle?.contentFrame();

  // Login iframe
  if (iframe) {
    await iframe.waitForSelector(selectors.emailUsername);
    // puppeteer is delayed in focusing on selector and occasionally misses the first few characters when typing so I click the input first
    await iframe.click(selectors.emailUsername);
    await iframe.type(selectors.emailUsername, creds.loginUsername, { delay: 150 });
    await iframe.type(selectors.password, creds.loginPassword, { delay: 100 });

    await iframe.click(selectors.loginBtn);
  } else {
    throw new Error("Could not find the correct iframe");
  }

  await page.waitForXPath(xpaths.loggedInText);
  await page.click(selectors.wishlistBtn);

  // Wishlists Page
  await page.waitForXPath(xpaths.wishlistLandingText);
  const wishlistItems = await buildWishlistItem(page);
  console.log(wishlistItems);

  await page.screenshot({ path: `puppeteerDownloads/screenshot${new Date()}BandN.png`})
  
  await browser.close()
}

start();