import { BasePage } from './base.page';
import { expect } from '@playwright/test';

type Product = {
  id: string,
  title: string,
  price: string,
  image: string
}

export class ProductsPage extends BasePage {

  async assertOnProductsPage() {
    await expect(this.page.locator('.title')).toHaveText('Products');
  }

  async checkProductList(products: Record<string, Product>) {
    for (const product of Object.values(products)) {

      const container = this.page.locator('.inventory_item').filter({
        has: this.page.locator('.inventory_item_name', { hasText: product.title })
      });

      await expect(
        container.locator('.inventory_item_price')
      ).toHaveText(product.price);
    }
  }

  async checkProductsOrder(products: Record<string, Product>, option: string, order: string) {
    const productsTitleInPage = this.page.locator('.inventory_item_name').allTextContents();
    const productsPriceInPage = this.page.locator('.inventory_item_price').allTextContents();
  }

  async addToCart(productName: string) {
    await this.page.locator(`text=${productName}`).click();
    await this.page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  async openCart() {
    await this.page.click('.shopping_cart_link');
  }
}
