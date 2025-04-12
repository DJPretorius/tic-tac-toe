import { test, expect } from '@playwright/test';

const gameTests = test.describe('Game Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete a winning game scenario', async ({ page }) => {
    // X wins with top row [0, 1, 2]
    await page.locator('.cell').nth(0).click(); // X plays
    await expect(page.locator('.game-status')).toHaveText("Player O's turn");
    
    await page.locator('.cell').nth(3).click(); // O plays
    await page.locator('.cell').nth(1).click(); // X plays
    await page.locator('.cell').nth(4).click(); // O plays
    await page.locator('.cell').nth(2).click(); // X wins

    await expect(page.locator('.game-status')).toHaveText('Player X wins!');
    await expect(page.locator('.winning-line')).toBeVisible();
    await expect(page.locator('.winning-line')).toHaveClass(/horizontal/);
  });

  test('should handle a draw scenario', async ({ page }) => {
    // Play moves that lead to a draw
    const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
    for (const move of moves) {
      await page.locator('.cell').nth(move).click();
    }

    await expect(page.locator('.game-status')).toHaveText('Game ended in a draw!');
  });

  test('should handle invalid moves', async ({ page }) => {
    // Try to play in the same cell twice
    await page.locator('.cell').nth(0).click();
    await expect(page.locator('.cell').nth(0)).toHaveText('X');
    
    await page.locator('.cell').nth(0).click();
    await expect(page.locator('.cell').nth(0)).toHaveText('X');
    await expect(page.locator('.game-status')).toHaveText("Player O's turn");
  });

  test('should reset the game properly', async ({ page }) => {
    // Make some moves
    await page.locator('.cell').nth(0).click();
    await page.locator('.cell').nth(1).click();
    await page.locator('.cell').nth(4).click();

    // Reset the game
    await page.locator('.reset-button').click();

    // Verify reset state
    await expect(page.locator('.game-status')).toHaveText("Player X's turn");
    await expect(page.locator('.cell')).toHaveCount(9);
    
    // Verify all cells are empty
    const cells = await page.locator('.cell').all();
    for (const cell of cells) {
      await expect(cell).toHaveText('');
    }
  });
});

const mobileTests = test.describe('Mobile Experience', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('mobile viewport - responsive layout', async ({ page }) => {
    // Verify game board fits in viewport
    const viewport = page.viewportSize();
    const board = await page.locator('.game-board');
    const boardBox = await board.boundingBox();
    
    expect(boardBox.width).toBeLessThanOrEqual(viewport.width);
    expect(boardBox.height).toBeLessThanOrEqual(viewport.height);
    
    // Verify game elements are visible and properly sized
    await expect(page.locator('.game-board')).toBeVisible();
    await expect(page.locator('.game-status')).toBeVisible();
    await expect(page.locator('.reset-button')).toBeVisible();
    
    // Verify cells are properly sized for touch
    const cell = await page.locator('.cell').first();
    const cellBox = await cell.boundingBox();
    expect(cellBox.width).toBeGreaterThanOrEqual(44); // Minimum touch target size
    expect(cellBox.height).toBeGreaterThanOrEqual(44);
  });

  test('mobile viewport - touch interactions', async ({ page }) => {
    // Test tap interaction
    await page.locator('.cell').nth(0).click(); 
    await expect(page.locator('.cell').nth(0)).toHaveText('X');
    
    await page.locator('.cell').nth(1).click();
    await expect(page.locator('.cell').nth(1)).toHaveText('O');
    
    // Test double-click (should not cause issues)
    await page.locator('.cell').nth(0).dblclick();
    await expect(page.locator('.cell').nth(0)).toHaveText('X');
    
    // Test reset button
    await page.locator('.reset-button').click();
    await expect(page.locator('.cell').nth(0)).toHaveText('');
  });

  test('mobile viewport - orientation changes', async ({ page }) => {
    // Test in portrait (default)
    await expect(page.locator('.game-board')).toBeVisible();
    
    // Test in landscape
    await page.setViewportSize({ width: 915, height: 412 }); // Pixel 5 landscape
    await expect(page.locator('.game-board')).toBeVisible();
    
    // Verify game is still playable in landscape
    await page.locator('.cell').nth(4).click();
    await expect(page.locator('.cell').nth(4)).toHaveText('X');
  });
}); 