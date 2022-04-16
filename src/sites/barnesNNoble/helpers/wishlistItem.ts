import { Page } from "playwright";
import { selectors } from "../references";

export interface WishlistItem {
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

export const buildWishlistItems = async ( page: Page ): Promise<WishlistItem[]> => {
  const wishlistArray: WishlistItem[] = [];

  // await page.waitForTimeout(1250);
  await page.waitForSelector(selectors.itemRating, {timeout: 30000});
  
  //TODO refactor iterating through wishlist items
  const wishlistItemHandles = await page.$$(selectors.wishlistArray);
  for (const wishlist of wishlistItemHandles) { 
      // Gets wishlist item data from HTML elements on node and pushes wishlist object to wishlist array
      const itemNameText = (await wishlist.$eval(selectors.itemName, (node) => (node as HTMLAnchorElement).innerText)).trim();
      const authorText = await wishlist.$eval(selectors.itemAuthor, (node) => (node as HTMLAnchorElement).innerText);
      const ratingNumber = await wishlist.$eval(selectors.itemRating, (node) => (node as HTMLDivElement).innerText);
      const dateAddedElement = (await wishlist.$eval(selectors.wishlistAddedDate, (node) => (node as HTMLDivElement).innerText)).split(" ")[1];
      const currPrice = (await wishlist.$eval(selectors.currPrice, (node) => (node as HTMLSpanElement).innerText)).slice(1);
      const imgSrc = await wishlist.$eval(selectors.itemImg, (node) => (node as HTMLImageElement).currentSrc);
      const inCartSpan = await wishlist.$(selectors.inCartSpan);
      // TODO handle PRE-ORDER btn
      // const addToCartBtn = await wishlist.$(selectors.cartBtn);

      const earliestDeliveryText = await wishlist.$eval(selectors.earliestDeliverySpan, (node) => (node as HTMLSpanElement).innerText);
      const outOfStock = await wishlist.$eval(selectors.outOfStockSpan, (node) => (node as HTMLSpanElement).innerText.includes("Temporarily out of stock online"))

      wishlistArray.push(
    {
      itemName: itemNameText,
      author: authorText,
      rating: Number(ratingNumber),
      dateAdded: dateAddedElement,
      currentPrice: Number(currPrice),
      productImageUrl: imgSrc,
      inCart: inCartSpan ? true : false,
      earliestDeliveryDate: earliestDeliveryText ? earliestDeliveryText : "",
      isAvailable: outOfStock ? false : true,
    });
  }

  return wishlistArray;
}