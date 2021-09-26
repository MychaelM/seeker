import * as puppeteer from 'puppeteer';
import { urls } from './references'

async function start(): Promise<void> {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(`${urls.homepage}`, { waitUntil: "domcontentloaded"});

  await browser.close()
}

start();