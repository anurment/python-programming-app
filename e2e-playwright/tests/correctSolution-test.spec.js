const { test, expect } = require("@playwright/test");


test("Correct feedback to correct solution" , async ({ page }) => {
    await page.goto("localhost:7800/");
    //const textbox = await page.getByPlaceholder('Type your Python code here...');
    await page.getByPlaceholder('Type your Python code here...').fill("def hello():  return 'Hello'");
    await page.getByRole('button', { name: 'Submit for grading' }).click();
    await expect(page.getByRole('button', {name:'Correct! Continue to the next assignment' })).toBeVisible({timeout: 30000});
  });