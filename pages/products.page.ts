import { BasePage } from './base.page';
import { expect } from '@playwright/test';
import { Product } from "../types/product.type";


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

  async checkProductsOrder(order: "az" | "za" | "hilo" | "lohi") {
    switch (order) {
      case "az":
        await this.checkFirstProduct('name', 'Sauce Labs Backpack')
        break;
      case "za":
        await this.checkFirstProduct('name', 'Test.allTheThings() T-Shirt (Red)')
        break;
      case "hilo":
        await this.checkFirstProduct('price', '$49.99')
        break;
      case "lohi":
        await this.checkFirstProduct('price', '$7.99')
        break;
    };
  }

  async sortProductsList(order: string){
    await this.page.selectOption('[data-test="product-sort-container"]', order)
  }

  async addToCart(productName: string) {
    await this.page.locator(`text=${productName}`).click();
    await this.page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  async openCart() {
    await this.page.click('.shopping_cart_link');
  }

  async checkFirstProduct(key: string, value: string) {
    await expect(
    this.page.locator('.inventory_item').first().locator(`.inventory_item_${key}`)
  ).toHaveText(value);
  }
}
