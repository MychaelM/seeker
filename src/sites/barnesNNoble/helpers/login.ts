import { Page } from "puppeteer"
import { selectors, creds, xpaths } from "../references"

const login = async (page: Page): Promise<void> => {
  // Selects and clicks login button from My account Dropdown
  await page.hover(selectors.myAccountDropdown)
  const [signInBtn] = await page.$x(xpaths.signInBtn);
  await signInBtn.click();

  // Waits for and stores element handle for parent div containing sign in iframe
  await page.waitForSelector(selectors.signInDiv);
  const elementHandle = await page.$(selectors.iframeElHandle);
  // Stores sign in frame from parent div element handle
  const iframe = await elementHandle?.contentFrame();

  // Inputs user credentials and logs in user after checking that iframe exists, returns error if iframe doesn't exist
  if (iframe) {
    await iframe.waitForSelector(selectors.emailUsername, { visible: true });
    // Sometimes when typing into username input pupetteer misses the first few characters I focus the input first
    await iframe.focus(selectors.emailUsername);
    await iframe.type(selectors.emailUsername, creds.loginUsername, { delay: 150 });
    await iframe.type(selectors.password, creds.loginPassword, { delay: 100 });

    await iframe.click(selectors.loginBtn);
  } else {
    await page.screenshot({ path: `puppeteerDownloads/screenshot${new Date()}BandN.png`})
    throw new Error("Could not find the Login iframe");
  }
}

export { login }