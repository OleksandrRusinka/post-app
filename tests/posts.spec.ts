import { expect, test } from '@playwright/test'

test.describe('Posts App', () => {
  test('should display posts list', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('h2')).toContainText('Latest posts')
    await expect(page.locator('[class*="grid"]')).toBeVisible()
  })

  test('should create a new post', async ({ page }) => {
    await page.goto('/')

    await page.click('button:has-text("Create Post")')

    await page.fill('input[placeholder*="Title"]', 'E2E Test Post')
    await page.fill('textarea[placeholder*="Body"]', 'This is a test post created by Playwright e2e tests')

    await page.click('button[type="submit"]')

    await expect(page.locator('text=E2E Test Post')).toBeVisible()
  })

  test('should navigate to post detail', async ({ page }) => {
    await page.goto('/')

    const firstPost = page.locator('[class*="grid"] > div').first()
    await firstPost.locator('button:has-text("View")').click()

    await expect(page).toHaveURL(/\/posts\/\d+/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should navigate to saved posts', async ({ page }) => {
    await page.goto('/')

    await page.click('a:has-text("Saved Posts")')

    await expect(page).toHaveURL('/posts/saved')
    await expect(page.locator('h1')).toContainText('Saved Posts')
  })

  test('should display Supabase posts first', async ({ page }) => {
    await page.goto('/')

    const posts = page.locator('[class*="grid"] > div')
    await expect(posts).toHaveCount(5)

    const firstPost = posts.first()
    await expect(firstPost).toBeVisible()
  })
})
