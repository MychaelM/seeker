import { Page } from "puppeteer"
import { selectors } from "../references"

interface WishlistItem {
  itemName: string;
  author: string;
  rating: number;
  dateAdded: string;
  currentPrice: number;
  productImageUrl: string;
  inCart: boolean;
  earliestDeliveryDate?: string;
  isAvailable: boolean;
}

const buildWishlistItem = async ( page: Page ): Promise<WishlistItem[]> => {
  // Gets wishlist item data from HTML elements on page
  const itemNameText = await (await page.$eval(selectors.itemName, (node) => (node as HTMLAnchorElement).innerText)).trim();
  const authorText = await page.$eval(selectors.itemAuthor, (node) => (node as HTMLAnchorElement).innerText);
  await page.waitForSelector(selectors.itemRating);
  const ratingNumber = await page.$eval(selectors.itemRating, (node) => (node as HTMLDivElement).innerText);
  const dateAddedElement = await (await page.$eval(selectors.wishlistAddedDate, (node) => (node as HTMLDivElement).innerText)).split(" ")[1];
  const currPrice = await (await page.$eval(selectors.currPrice, (node) => (node as HTMLSpanElement).innerText)).slice(1);
  const imgSrc = await page.$eval(selectors.itemImg, (node) => (node as HTMLImageElement).currentSrc);
  const addToCartBtn= await page.$(selectors.cartBtn);
  const earliestDeliveryText = await page.$eval(selectors.earliestDeliverySpan, (node) => (node as HTMLSpanElement).innerText);

  return [
    {
      itemName: itemNameText,
      author: authorText,
      rating: Number(ratingNumber),
      dateAdded: dateAddedElement,
      currentPrice: Number(currPrice),
      productImageUrl: imgSrc,
      inCart: addToCartBtn ? false : true,
      earliestDeliveryDate: earliestDeliveryText ? earliestDeliveryText : "",
      // TODO sort out when an item is unavailable
      isAvailable: true,
    }
  ]
}

export { buildWishlistItem, WishlistItem }