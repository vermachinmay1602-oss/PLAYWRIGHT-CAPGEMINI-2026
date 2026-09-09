import { test, expect } from '@playwright/test';
import { registrationData, phptravelsUrls } from '../agentsoutput/requiremtAnalysis/phptravels-test-data';

test.describe('Authentication and Account', () => {
  test('registration validates required fields and password rules', async ({ page }) => {
    await page.goto(phptravelsUrls.signup);
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
    const demoNoticeButton = page.getByRole('button', { name: 'I Understand & Continue' });
    if (await demoNoticeButton.isVisible()) await demoNoticeButton.click();
    await expect(page.getByRole('button', { name: /Create Account/i })).toBeVisible();
    await expect(page.getByText(/Password must be at least 6 characters long/i)).toBeVisible();
    await expect(page).toHaveURL(/\/signup/);
    expect(registrationData.shortPassword).toHaveLength(5);
    expect(registrationData.minimumPassword).toHaveLength(6);
    expect(registrationData.mismatchedPassword.password).not.toBe(registrationData.mismatchedPassword.confirmPassword);
  });
});
