import { chromium, Page } from 'playwright';

export const setupBrowser = async (): Promise<Page> => {
  
  const browser = await chromium.launch({ headless: false, devtools: true });
  const page = await browser.newPage();
  return page;

}

export const closeBrowser = async (page: Page): Promise<void> => {
  return page.context().close()
}