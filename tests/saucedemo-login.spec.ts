import { test, expect, type Page } from '@playwright/test';
import { sauceDemoLoginData } from '../test-data/saucedemo-login.data';

test.describe('SauceDemo Login', () => {
  const usernameInput = (page: Page) => page.locator('[data-test="username"]');
  const passwordInput = (page: Page) => page.locator('[data-test="password"]');
  const loginButton = (page: Page) => page.locator('[data-test="login-button"]');
  const loginError = (page: Page) => page.locator('[data-test="error"]');
  const inventoryContainer = (page: Page) => page.locator('[data-test="inventory-container"]');

  test('logs in with valid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await usernameInput(page).fill(sauceDemoLoginData.valid.username);
    await passwordInput(page).fill(sauceDemoLoginData.valid.password);
    await loginButton(page).click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
    await expect(inventoryContainer(page)).toBeVisible();
  });

  test('rejects invalid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await usernameInput(page).fill(sauceDemoLoginData.invalid.username);
    await passwordInput(page).fill(sauceDemoLoginData.invalid.password);
    await loginButton(page).click();
    await expect(loginError(page)).toContainText('Epic sadface: Username and password do not match any user in this service');
    await expect(page).not.toHaveURL(/inventory\.html/);
    await expect(inventoryContainer(page)).not.toBeVisible();
  });

  test('rejects locked-out users', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await usernameInput(page).fill(sauceDemoLoginData.lockedOut.username);
    await passwordInput(page).fill(sauceDemoLoginData.lockedOut.password);
    await loginButton(page).click();
    await expect(loginError(page)).toContainText('Epic sadface: Sorry, this user has been locked out.');
    await expect(page).not.toHaveURL(/inventory\.html/);
    await expect(inventoryContainer(page)).not.toBeVisible();
  });

  test('requires a username and password when both fields are blank', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await usernameInput(page).fill(sauceDemoLoginData.empty.username);
    await passwordInput(page).fill(sauceDemoLoginData.empty.password);
    await loginButton(page).click();
    await expect(loginError(page)).toContainText('Epic sadface: Username is required');
    await expect(page).not.toHaveURL(/inventory\.html/);
  });

  test('requires a username when only the password is provided', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await usernameInput(page).fill(sauceDemoLoginData.emptyUsername.username);
    await passwordInput(page).fill(sauceDemoLoginData.emptyUsername.password);
    await loginButton(page).click();
    await expect(loginError(page)).toContainText('Epic sadface: Username is required');
    await expect(page).not.toHaveURL(/inventory\.html/);
  });

  test('requires a password when only the username is provided', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await usernameInput(page).fill(sauceDemoLoginData.emptyPassword.username);
    await passwordInput(page).fill(sauceDemoLoginData.emptyPassword.password);
    await loginButton(page).click();
    await expect(loginError(page)).toContainText('Epic sadface: Password is required');
    await expect(page).not.toHaveURL(/inventory\.html/);
  });

  test('masks the password field', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await passwordInput(page).fill(sauceDemoLoginData.passwordMasking.value);
    await expect(passwordInput(page)).toHaveAttribute('type', sauceDemoLoginData.passwordMasking.expectedInputType);
  });
});
