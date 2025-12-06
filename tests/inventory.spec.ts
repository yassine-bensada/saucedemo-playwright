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


});