const { test, expect } = require('@playwright/test');
const path = require('path');

const pageUrl = `file://${path.resolve(__dirname, '../index.html')}`;

test.describe('portfolio page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
  });

  test('contains the main sections and required content', async ({ page }) => {
    await expect(page.locator('main section')).toHaveCount(5);
    await expect(page.locator('h1')).toHaveText('I’m Itzel.');
    await expect(page.locator('#about-title')).toHaveText('About Me');
    await expect(page.locator('#projects-title')).toHaveText('Projects');
    await expect(page.locator('#skills-title')).toHaveText('Skills');
    await expect(page.locator('#education-title')).toHaveText('Education');
    await expect(page.locator('#projects .project')).toHaveCount(2);
    await expect(page.locator('main section#contact')).toHaveCount(0);
    await expect(page.locator('footer#contact')).toHaveCount(1);
  });

  test('keeps the Fashion Data Vault link safe and excludes Rat Brain source links', async ({ page }) => {
    const projectLink = page.locator('.project-link');

    await expect(projectLink).toHaveText(/View More/);
    await expect(projectLink).toHaveAttribute('href', 'https://github.com/salazaritzel/fashion-data-vault');
    await expect(projectLink).toHaveAttribute('target', '_blank');
    await expect(projectLink).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(projectLink.locator('svg')).toHaveAttribute('stroke', 'currentColor');
    await expect(projectLink.locator('svg')).toHaveAttribute('fill', 'none');
    await expect(page.locator('#projects .project').nth(1).locator('a')).toHaveCount(0);
  });

  test('keeps the CV link downloadable', async ({ page }) => {
    const cvLink = page.getByRole('link', { name: 'Download CV' });

    await expect(cvLink).toHaveAttribute('href', 'Salazar_Itzel_Resume.pdf');
    await expect(cvLink).toHaveAttribute('download', '');
  });

  test('opens and closes the mobile menu with focus management', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload();

    const menuButton = page.getByRole('button', { name: 'Menu' });
    const navigation = page.locator('#primary-navigation');

    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(navigation).toBeHidden();

    await menuButton.click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    await expect(navigation).toBeVisible();
    await expect(navigation.locator('a').first()).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(navigation).toBeHidden();
    await expect(menuButton).toBeFocused();
  });

  test('keeps contact links accessible and prevents mobile overflow', async ({ page }) => {
    const contactFooter = page.locator('footer#contact');
    const contactLinks = contactFooter.locator('.icon-link');

    await expect(contactFooter.locator('> *')).toHaveCount(1);
    await expect(contactFooter.locator('ul')).toHaveAttribute('aria-label', 'Contact');
    await expect(contactLinks).toHaveCount(3);
    await expect(contactLinks.nth(0)).toHaveAttribute('aria-label', 'Send email');
    await expect(contactLinks.nth(0)).toHaveAttribute('href', 'mailto:salazitzel@gmail.com');
    await expect(contactLinks.nth(1)).toHaveAttribute('aria-label', 'LinkedIn profile');
    await expect(contactLinks.nth(1)).toHaveAttribute('href', 'https://linkedin.com/in/itzel-salazar');
    await expect(contactLinks.nth(2)).toHaveAttribute('aria-label', 'GitHub profile');
    await expect(contactLinks.nth(2)).toHaveAttribute('href', 'https://github.com/salazaritzel');

    await page.setViewportSize({ width: 390, height: 844 });
    const dimensions = await page.locator('html').evaluate((element) => ({
      scrollWidth: element.scrollWidth,
      clientWidth: element.clientWidth
    }));
    expect(dimensions.scrollWidth).toBe(dimensions.clientWidth);
  });
});
