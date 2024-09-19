const { test, expect } = require("@playwright/test");

/*
test("Server responds with a page with the title 'Programming assignments'", async ({ page }) => {
  await page.goto("localhost:7800/");
  expect(await page.title()).toBe("Programming assignments");
});

*/

test("Correct feedback to incorrect solution" , async ({ page }) => {
  await page.goto("localhost:7800/");
  const textbox = await page.getByPlaceholder('Type your Python code here...');
  await textbox.fill("def hello():  return 'hello'");
  await page.getByRole('button',{ name: 'Submit for grading' }).click();
  await expect(page.getByText('Some tests did not pass, try again!')).toBeVisible({timeout: 30000});
});






