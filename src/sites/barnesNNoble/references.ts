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
  "wishlistAddedDate": "div.added-date.text--right"
};

const xpaths = {
  "signInBtn": '//a[contains(., "Sign In")]',
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