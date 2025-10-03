import { expect, test } from '@playwright/test'

test.describe('Posts App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en')
  })

  test('should navigate between All Posts and Saved Posts pages', async ({ page }) => {
    await expect(page.locator('text=All Posts')).toBeVisible()

    const savedPostsLink = page.locator('a:has-text("Saved Posts")')
    await expect(savedPostsLink).toBeVisible()
    await savedPostsLink.click()

    await expect(page).toHaveURL(/\/posts\/saved/)
    await expect(page.locator('text=Saved Posts')).toBeVisible()

    const allPostsLink = page.locator('a:has-text("All Posts")')
    await expect(allPostsLink).toBeVisible()
    await allPostsLink.click()

    await expect(page).toHaveURL(/\/en\/?$/)
    await expect(page.locator('text=All Posts')).toBeVisible()
  })

  test('should create a new post', async ({ page }) => {
    const createButton = page.locator('button:has-text("Create Post")')
    await expect(createButton).toBeVisible()
    await createButton.click()

    await page.waitForSelector('text=Create New Post', { timeout: 5000 })

    const titleInput = page.locator('input[placeholder*="title"]').first()
    const bodyTextarea = page.locator('textarea[placeholder*="content"]').first()

    await titleInput.fill('E2E Test Post Title')
    await bodyTextarea.fill('This is a test post content created by Playwright for testing')

    const submitButton = page.locator('button:has-text("Create Post")').last()
    await submitButton.click()

    await page.waitForTimeout(2000)
    await expect(page.locator('text=E2E Test Post Title')).toBeVisible({ timeout: 10000 })
  })

  test('should navigate to post detail', async ({ page }) => {
    const postsGrid = page.locator('[class*="grid"] > div')
    await expect(postsGrid.first()).toBeVisible()

    const firstPost = postsGrid.first()

    const readMoreButton = firstPost.locator('a:has-text("Read More")')
    await expect(readMoreButton).toBeVisible()
    await readMoreButton.click()

    await expect(page).toHaveURL(/\/posts\/\d+/)
    await expect(page.locator('h1')).toBeVisible()
  })
})
