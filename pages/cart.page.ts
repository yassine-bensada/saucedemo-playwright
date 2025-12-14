import { expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { Product } from "../types/product.type";

export class CartPage extends BasePage {

  async assertOnCartPage() {
    await expect(this.page.locator('.title')).toHaveText('Your Cart');
    await expect(this.page.locator('#cart_contents_container')).toBeVisible();
  }

  async checkCartList(products: Record<string, Product>) {
    for (const product of Object.values(products)) {

      const container = this.page.locator('.cart_item').filter({
        has: this.page.locator('.inventory_item_name', { hasText: product.title })
      });
      await expect(
        container.locator('.cart_quantity')
      ).toHaveText('1');
      await expect(
        container.locator('.inventory_item_price')
      ).toHaveText(product.price);
    }
  }
}