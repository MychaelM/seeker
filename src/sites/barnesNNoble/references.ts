import * as dotenv from 'dotenv';
dotenv.config();

const selectors = {
  "myAccountDropdown": "#navbarDropdown",
  "signInBtn": "/html/body/div[1]/header/nav/div/div[2]/ul[2]/li[1]/div/dd/a[1]",
  "emailUsername": "#email",
  "password": "#password",
  "signInDiv": "body > div.modal > div",
  "iframeElHandle": "body > div.modal > div > iframe",
  "loginBtn": "button.btn.btn--large",
  "wishlistBtn": "li.new-li-rhf-icon-wishlist > a.wishlist-link",
  "wishlistAddedDate": "div.added-date.text--right"
};

const xpaths = {
  "loggedInText": '//a[contains(text(), "Hi, ")]',
  "wishlistLandingText": '//h1[contains(., "Your Wishlists")]'
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