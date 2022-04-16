import { closeBrowser, setupBrowser } from '../../browser';
import { login } from './helpers/login';
import { buildWishlistItems, WishlistItem } from './helpers/wishlistItem';
import { urls, selectors } from './references'

export const start = async (): Promise<WishlistItem[]> => {
  // launches browser and navigates to the B&N homepage, waits until dom content is loaded
  const page = await setupBrowser();
  await page.goto(`${urls.homepage}`, { waitUntil: "domcontentloaded"});

  // Logs in user from the homepage
  await login(page);

  // Waits for successful login and navigates to the wishlist page
  // await page.waitForSelector(xpaths.loggedInText);
  await page.click(selectors.wishlistBtn);

  // waits for wishlists page to load and then builds wishlist items
  // await page.waitForSelector(xpaths.wishlistLandingText);
  const wishlistItems = await buildWishlistItems(page);
  
  // Closes browser and returns wishlist item data
  await closeBrowser(page);
  return wishlistItems;
}
// start();