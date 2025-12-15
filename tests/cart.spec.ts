import { test } from '@playwright/test'
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import users from '../data/users.json'
import products from '../data/cart-products.json';


test.describe("Cart flow tests",  () => {
    test("Add and removes products", async ({ page }) => {
        const login = new LoginPage(page);
        const inventory = new ProductsPage(page);
        const cart = new CartPage(page);

        await login.goto();
        await login.login(users.validUser.username, users.validUser.password);
        await inventory.assertOnProductsPage();
        await inventory.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await inventory.click('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
        await inventory.click('[data-test="shopping-cart-link"]');
        await cart.assertOnCartPage();
        await cart.checkCartList(products.products)


    })
})