import * as dotenv from 'dotenv';
dotenv.config();

const selectors = {
  "myAccountDropdown": "#navbarDropdown",
  "signInBtn": "/html/body/div[1]/header/nav/div/div[2]/ul[2]/li[1]/div/dd/a[1]",
  "emailUsername": "#email",
  "password": "#password",
  "loginBtn": "button.btn.btn--large"
};

const urls = {
  "homepage": "https://www.barnesandnoble.com"
};

const creds = {
  "loginUsername": process.env.USERNAME as string,
  "loginPassword": process.env.PASSWORD as string
}

export {
  selectors,
  urls,
  creds,
}