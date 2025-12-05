import { BasePage } from './base.page';
import { expect } from '@playwright/test';

export class ProductsPage extends BasePage {

  async assertOnProductsPage() {
    await expect(this.page.locator('.title')).toHaveText('Products');
  }

  async addToCart(productName: string) {
    await this.page.locator(`text=${productName}`).click();
    await this.page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  async openCart() {
    await this.page.click('.shopping_cart_link');
  }
}
