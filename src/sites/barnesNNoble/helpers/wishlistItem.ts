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
  earliestDeliveryDate: string;
  isAvailable: boolean;
}

const buildWishlistItem = async ( page: Page ): Promise<WishlistItem[]> => {
  const dateAddedElement = await page.$eval(selectors.wishlistAddedDate, (node) => (node as HTMLDivElement).innerText);

  return [
    {
      itemName: "",
      author: "",
      rating: 0,
      dateAdded: dateAddedElement ? dateAddedElement.split(" ")[1] : "",
      currentPrice: 0,
      productImageUrl: "",
      inCart: false,
      earliestDeliveryDate: "",
      isAvailable: true,
    }
  ]
}

export { buildWishlistItem }