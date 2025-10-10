import { expect, test } from '@playwright/test'

test.describe('Posts App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en')
  })

  test('should navigate to post detail page', async ({ page }) => {
    await expect(page.locator('[class*="grid"] > div').first()).toBeVisible()

    const firstPost = page.locator('[class*="grid"] > div').first()

    const readMoreButton = firstPost.locator('a:has-text("Read More")')
    await expect(readMoreButton).toBeVisible()
    await readMoreButton.click()

    await expect(page).toHaveURL(/\/posts\/\d+/)

    await expect(page.locator('h1')).toBeVisible()

    await expect(page.locator('a:has-text("Back to All Posts")')).toBeVisible()
  })
})
