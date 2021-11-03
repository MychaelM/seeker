import { Page } from "puppeteer"
import { selectors} from "../references"

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

const buildWishlistItems = async ( page: Page ): Promise<WishlistItem[]> => {
  const wishlistArray: WishlistItem[] = [];

  await page.waitForTimeout(1250);
  await page.waitForSelector(selectors.itemRating, {timeout: 30000});
  
  const wishlistItemHandles = await page.$$(selectors.wishlistArray);


  for (const wishlist of wishlistItemHandles) { 
    const [
      itemNameText, 
      authorText, 
      ratingNumber, 
      dateAddedElement, 
      currPrice, 
      imgSrc, 
      inCartSpan, 
      earliestDeliveryText, 
      outOfStock] = await Promise.all([
      // Gets wishlist item data from HTML elements on node and pushes wishlist object to wishlist array
      wishlist.$eval(selectors.itemName, (node) => (node as HTMLAnchorElement).innerText),
      wishlist.$eval(selectors.itemAuthor, (node) => (node as HTMLAnchorElement).innerText),
      wishlist.$eval(selectors.itemRating, (node) => (node as HTMLDivElement).innerText),
      wishlist.$eval(selectors.wishlistAddedDate, (node) => (node as HTMLDivElement).innerText),
      wishlist.$eval(selectors.currPrice, (node) => (node as HTMLSpanElement).innerText),
      wishlist.$eval(selectors.itemImg, (node) => (node as HTMLImageElement).currentSrc),
      wishlist.$(selectors.inCartSpan),
      // TODO handle PRE-ORDER btn
      wishlist.$eval(selectors.earliestDeliverySpan, (node) => (node as HTMLSpanElement).innerText),
      wishlist.$eval(selectors.outOfStockSpan, (node) => (node as HTMLSpanElement).innerText.includes("Temporarily out of stock online"))])
      

      wishlistArray.push(
    {
      itemName: itemNameText.trim(),
      author: authorText,
      rating: Number(ratingNumber),
      dateAdded: dateAddedElement.split(" ")[1],
      currentPrice: Number(currPrice.slice(1)),
      productImageUrl: imgSrc,
      inCart: inCartSpan ? true : false,
      earliestDeliveryDate: earliestDeliveryText ? earliestDeliveryText.trim() : "",
      isAvailable: outOfStock ? false : true,
    });
  }

  return wishlistArray;
}

export { buildWishlistItems, WishlistItem }