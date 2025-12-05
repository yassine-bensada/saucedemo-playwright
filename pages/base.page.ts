import { Page, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async wait(seconds: number) {
    await this.page.waitForTimeout(seconds * 1000);
  }
}
