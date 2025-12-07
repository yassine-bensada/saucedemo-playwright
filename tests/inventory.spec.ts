import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import products from '../data/products.json'
import users from '../data/users.json'

test.describe("Inventory Test", () => {
    test("Check the list of products", async ({ page }) => {
        const login = new LoginPage(page);
        const inventory = new ProductsPage(page);

        await login.goto();
        await login.login(users.validUser.username, users.validUser.password);
        await inventory.assertOnProductsPage();
        await inventory.checkProductList(products.products);

    });

    test("Sort the products by the title or price", async ({ page }) => {
        const login = new LoginPage(page);
        const inventory = new ProductsPage(page);

        await login.goto();
        await login.login(users.validUser.username, users.validUser.password);
        await inventory.assertOnProductsPage();

        await inventory.sortProductsList("az")
        await inventory.checkProductsOrder("az");

        await inventory.sortProductsList("za")
        await inventory.checkProductsOrder("za");

        await inventory.sortProductsList("lohi")
        await inventory.checkProductsOrder("lohi");

        await inventory.sortProductsList("hilo")
        await inventory.checkProductsOrder("hilo");
    });



});