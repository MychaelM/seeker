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
  const itemNameText = await page.$eval(selectors.itemName, (node) => (node as HTMLAnchorElement).innerText);
  const authorText = await page.$eval(selectors.itemAuthor, (node) => (node as HTMLAnchorElement).innerText);
  await page.waitForSelector(selectors.itemRating).catch(() => console.log("didn't find the item rating selector"));
  const ratingNumber = await page.$eval(selectors.itemRating, (node) => (node as HTMLDivElement).innerText);
  const dateAddedElement = await page.$eval(selectors.wishlistAddedDate, (node) => (node as HTMLDivElement).innerText);
  const currPrice = await page.$eval(selectors.currPrice, (node) => (node as HTMLSpanElement).innerText);
  const imgSrc = await page.$eval(selectors.itemImg, (node) => (node as HTMLImageElement).currentSrc);
  const addToCartBtn= await page.$(selectors.cartBtn);
  const earliestDeliveryText = await page.$eval(selectors.earliestDeliverySpan, (node) => (node as HTMLSpanElement).innerText);

  return [
    {
      itemName: itemNameText.trim(),
      author: authorText,
      rating: Number(ratingNumber),
      dateAdded: dateAddedElement.split(" ")[1],
      currentPrice: Number(currPrice.slice(1)),
      productImageUrl: imgSrc,
      inCart: addToCartBtn ? false : true,
      earliestDeliveryDate: earliestDeliveryText ? earliestDeliveryText : "",
      // TODO sort out when an item is unavailable
      isAvailable: true,
    }
  ]
}

export { buildWishlistItem }