import { expect } from "@playwright/test";
import { BasePage } from "./base.page";

class CartPage extends BasePage {

    async assertOnCartPage() {
        await expect(this.page.locator('.title')).toHaveText('Your Cart');
        await expect(this.page.locator('#cart_contents_container')).toBeVisible();
      }
}