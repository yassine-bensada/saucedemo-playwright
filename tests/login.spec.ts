import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import users from '../data/users.json';

test.describe('Login Tests', () => {

  
  test('Invalid login with error message', async ({ page }) => {
    const login = new LoginPage(page);
    
    await login.goto();
    await login.login(users.invalidUser.username, users.invalidUser.password);
    await login.assertLoginFailed();
    await login.asserFailedMessage(users.invalidUser.message);
  });
  
  test('Empty user field with password', async ({ page }) => {
    const login = new LoginPage(page);
    
    await login.goto();
    await login.login(users.emptyUser.username, users.emptyUser.password);
    await login.assertLoginFailed();
    await login.asserFailedMessage(users.emptyUser.message);
  });

  test('Empty password field with user', async ({ page }) => {
    const login = new LoginPage(page);
    
    await login.goto();
    await login.login(users.emptyPassword.username, users.emptyPassword.password);
    await login.assertLoginFailed();
    await login.asserFailedMessage(users.emptyPassword.message);
  });

  test('Locked user', async ({ page }) => {
    const login = new LoginPage(page);
    
    await login.goto();
    await login.login(users.lockedUser.username, users.lockedUser.password);
    await login.assertLoginFailed();
    await login.asserFailedMessage(users.lockedUser.message);
  });
  
  test('Valid login', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);

    await login.goto();
    await login.login(users.validUser.username, users.validUser.password);
    await products.assertOnProductsPage();
  });
});
