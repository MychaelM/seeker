import * as dotenv from 'dotenv';
dotenv.config();

const selectors = {
  "myAccountDropdown": "#navbarDropdown",
  "emailUsername": "#email",
  "password": "#password",
  "signInDiv": "div.modal__dialog",
  "iframeElHandle": "div.modal__dialog > iframe",
  "loginBtn": "button.btn.btn--large",
  "wishlistBtn": "li.new-li-rhf-icon-wishlist > a.wishlist-link",
  "wishlistAddedDate": "div.added-date.text--right",
  "itemName": "h3[itemprop] > a",
  "itemAuthor": "p.product-shelf-author > a",
  "itemRating": "div[itemprop='ratingValue']",
  "currPrice": "span.current-price",
  "itemImg": "img.full-shadow",
  "cartBtn": "input[value='ADD TO CART']",
  "earliestDeliverySpan": "span.bold-text",
  "wishlistArray": "div.prod-img-details-sec",
  "outOfStockSpan": "div.pdp-commerce-zone > p > span",
  "inCartSpan": "div.wishlist-icons > span"
};

const xpaths = {
  "signInBtn": '//a[contains(., "Sign In")]',
  "loggedInText": '//a[contains(text(), "Hi, ")]',
  "wishlistLandingText": '//h2[contains(., "My Wishlist")]',
}

const urls = {
  "homepage": "https://www.barnesandnoble.com"
};

const creds = {
  "loginUsername": process.env.USERNAME as string,
  "loginPassword": process.env.PASSWORD as string
}

export {
  selectors,
  xpaths,
  urls,
  creds,
}