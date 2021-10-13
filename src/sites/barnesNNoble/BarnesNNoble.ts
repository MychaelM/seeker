import puppeteer from 'puppeteer';
import { login } from './helpers/login';
import { buildWishlistItems, WishlistItem } from './helpers/wishlistItem';
import { urls, selectors, xpaths } from './references'

async function start(): Promise<WishlistItem[]> {
  // launches browser and navigates to the B&N homepage, waits until dom content is loaded
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null});
  const page = await browser.newPage();
  await page.goto(`${urls.homepage}`, { waitUntil: "domcontentloaded"});

  // Logs in user from the homepage
  await login(page);

  // Waits for successful login and navigates to the wishlist page
  await page.waitForXPath(xpaths.loggedInText);
  await page.click(selectors.wishlistBtn);

  // waits for wishlists page to load and then builds wishlist items
  await page.waitForXPath(xpaths.wishlistLandingText);
  const wishlistItems = await buildWishlistItems(page);
  
  // Closes browser and returns wishlist item data
  await browser.close()
  return wishlistItems;
}

export { start }
// start();