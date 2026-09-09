import { test, expect } from '@playwright/test';
import { phptravelsUrls, validSearchData } from '../agentsoutput/requiremtAnalysis/phptravels-test-data';

test.describe('Search and Policy Smoke Coverage', () => {
  test('primary search pages expose documented controls', async ({ page }) => {
    await page.goto(phptravelsUrls.flights);
    await expect(page).toHaveTitle(/PHPTRAVELS|Flights/i);
    await expect(page.getByText(/Departure From/i)).toBeVisible();
    await expect(page.getByText(/Arrival To/i)).toBeVisible();
    await expect(page.getByText(/Passengers/i)).toBeVisible();
    expect(validSearchData.flightOneWay.departure).toBe('Dubai');
    expect(validSearchData.flightOneWay.arrival).toBe('London');
    await page.goto(phptravelsUrls.cars);
    await expect(page.getByText(/Pick-up Location/i)).toBeVisible();
    await expect(page.getByText(/Return Location/i)).toBeVisible();
    await page.goto(phptravelsUrls.visa);
    await expect(page.getByText(/From Country/i)).toBeVisible();
    await expect(page.getByText(/To Country/i)).toBeVisible();
    await expect(page.getByText(/Visa Type/i)).toBeVisible();
    await expect(page.getByText(/Processing speed/i)).toBeVisible();
    await expect(page.getByText(/Travelers/i)).toBeVisible();
  });

  test('refund and policy pages are reachable', async ({ page }) => {
    await page.goto(phptravelsUrls.refundPolicy);
    await expect(page.getByRole('heading', { name: 'Refund Policy' })).toBeVisible();
    await expect(page.getByText(/Refund eligibility depends on the specific service booked/i)).toBeVisible();
    await expect(page.getByText(/Refund Request Procedure/i)).toBeVisible();
    await page.goto(phptravelsUrls.terms);
    await expect(page.getByRole('heading', { name: 'Terms of Use' })).toBeVisible();
    await page.goto(phptravelsUrls.privacy);
    await expect(page.getByRole('heading', { name: /Privacy Policy/i })).toBeVisible();
  });
});
