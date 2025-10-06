import { expect, test } from '@playwright/test'

test.describe('Posts App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en')
  })

  test('should display home page with posts', async ({ page }) => {
    await expect(page.locator('h1:has-text("Blog Posts")')).toBeVisible()

    await expect(page.locator('text=Discover our collection of articles and insights')).toBeVisible()

    await expect(page.locator('h2:has-text("Latest Posts")')).toBeVisible()

    await expect(page.locator('button:has-text("Create Post")')).toBeVisible()

    await expect(page.locator('[class*="grid"] > div').first()).toBeVisible()
  })

  test('should navigate between All Posts and Saved Posts pages', async ({ page }) => {
    await expect(page.locator('h1:has-text("Blog Posts")')).toBeVisible()

    const savedPostsLink = page.locator('a:has-text("Saved Posts")')
    await expect(savedPostsLink).toBeVisible()
    await savedPostsLink.click()

    await expect(page).toHaveURL(/\/posts\/saved/)
    await expect(page.locator('h1:has-text("Saved Posts")')).toBeVisible()
    await expect(page.locator('text=Your saved posts - create, edit and delete')).toBeVisible()

    const allPostsLink = page.locator('a:has-text("All Posts")')
    await expect(allPostsLink).toBeVisible()
    await allPostsLink.click()

    await expect(page).toHaveURL(/\/$/)
    await expect(page.locator('h1:has-text("Blog Posts")')).toBeVisible()
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
