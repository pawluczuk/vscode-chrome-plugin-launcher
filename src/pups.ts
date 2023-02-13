import * as puppeteer from 'puppeteer';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join as pathJoin } from 'node:path';

type OpenBrowserSettings = {
  urlPage?: string;
  tmpProfileDirectory?: string;
  extensionDirectory: string;
};

const createTmpDir = () => {
  return mkdtempSync(pathJoin(tmpdir(), 'chrome-plugin-dev-'));
};

export const openSettings = async ({ 
  urlPage = 'http://google.com',
  tmpProfileDirectory = createTmpDir(),
  extensionDirectory
}: OpenBrowserSettings) => {
  const browser = await puppeteer.launch({ 
    headless: false,
    ignoreDefaultArgs: ['--disable-extensions'],
    args: [
      `--load-extension=${extensionDirectory}`,
      `--user-data-dir=${tmpProfileDirectory}`
    ]
  });
  const page = await browser.newPage();

  await page.goto(urlPage);
};
