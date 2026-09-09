import { test, expect } from '@playwright/test';

test.describe('Homepage and Navigation', () => {
  test('homepage loads and exposes primary travel services', async ({ page }) => {
    await page.goto('https://phptravels.net/');
    await expect(page).toHaveTitle(/PHPTRAVELS/i);
    await expect(page.getByRole('heading', { name: 'Travel the way you love!' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Important Notice: Demo Environment' })).toBeVisible();
    const continueButton = page.getByRole('button', { name: 'I Understand & Continue' });
    await expect(continueButton).toBeVisible();
    await continueButton.click();
    await expect(page.getByRole('tab', { name: /Stays/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Flights/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Visa/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /AI Trip Planner/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Login/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Signup/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Featured Properties/i })).toBeVisible();
    await expect(page.locator('a[href*="/stay/"]').first()).toBeVisible();
  });
});
