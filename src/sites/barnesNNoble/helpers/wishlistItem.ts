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
      (await wishlist.$eval(selectors.itemName, (node) => (node as HTMLAnchorElement).innerText)).trim(),
      await wishlist.$eval(selectors.itemAuthor, (node) => (node as HTMLAnchorElement).innerText),
      (await wishlist.$eval(selectors.itemRating, (node) => (node as HTMLDivElement).innerText)),
      (await wishlist.$eval(selectors.wishlistAddedDate, (node) => (node as HTMLDivElement).innerText)).split(" ")[1],
      (await wishlist.$eval(selectors.currPrice, (node) => (node as HTMLSpanElement).innerText)).slice(1),
      await wishlist.$eval(selectors.itemImg, (node) => (node as HTMLImageElement).currentSrc),
      await wishlist.$(selectors.inCartSpan),
      // TODO handle PRE-ORDER btn

      (await wishlist.$eval(selectors.earliestDeliverySpan, (node) => (node as HTMLSpanElement).innerText)).trim(),
      await wishlist.$eval(selectors.outOfStockSpan, (node) => (node as HTMLSpanElement).innerText.includes("Temporarily out of stock online"))])
      

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

export { buildWishlistItems, WishlistItem }