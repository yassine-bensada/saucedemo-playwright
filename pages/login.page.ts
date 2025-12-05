import { BasePage } from './base.page';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    /**
     * Fill username and password fields and submit them
     */
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

  async asserFailedMessage(message : string) {
    await expect(this.page.locator('[data-test="error"]')).toHaveText(message);
  }

  async assertLoginFailed() {
    await expect(this.page.locator('[data-test="error"]')).toBeVisible();
  }
}
