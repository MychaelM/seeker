import puppeteer from 'puppeteer';
import { buildWishlistItem, WishlistItem } from './helpers/wishlistItem';
import { urls, selectors, creds, xpaths } from './references'

async function start(): Promise<WishlistItem[]> {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null});
  const page = await browser.newPage();
  await page.goto(`${urls.homepage}`, { waitUntil: "domcontentloaded"});

  // Homepage
  await page.hover(selectors.myAccountDropdown)
  const [signInBtn] = await page.$x(xpaths.signInBtn);
  await signInBtn.click();
  await page.waitForSelector(selectors.signInDiv);
  const elementHandle = await page.$(selectors.iframeElHandle);
  const iframe = await elementHandle?.contentFrame();

  // Login iframe
  if (iframe) {
    await iframe.waitForSelector(selectors.emailUsername, { visible: true });
    // Sometimes when typing into username input pupetteer misses the first few characters I focus the input first
    await iframe.focus(selectors.emailUsername);
    await iframe.type(selectors.emailUsername, creds.loginUsername, { delay: 150 });
    await iframe.type(selectors.password, creds.loginPassword, { delay: 100 });

    await iframe.click(selectors.loginBtn);
  } else {
    await page.screenshot({ path: `puppeteerDownloads/screenshot${new Date()}BandN.png`})
    throw new Error("Could not find the Login iframe");
  }

  await page.waitForXPath(xpaths.loggedInText);
  await page.click(selectors.wishlistBtn);

  // Wishlists Page
  await page.waitForXPath(xpaths.wishlistLandingText);
  const wishlistItems = await buildWishlistItem(page);
  
  await browser.close()
  return wishlistItems;
}

export { start }
// start();