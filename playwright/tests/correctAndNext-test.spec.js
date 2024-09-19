const { test, expect } = require("@playwright/test");

const firstAssignment = 'Write a function "hello" that returns the string "Hello"';
const secondAssignment = 'Write a function "hello" that returns the string "Hello World!"';


test("User can move to next assignment after correct solution" , async ({ page }) => {
  await page.goto("localhost:7800/");
  await expect(page.getByText(firstAssignment)).toBeVisible();
  await page.getByPlaceholder('Type your Python code here...').fill("def hello():  return 'Hello'");
  await page.getByRole('button', { name: 'Submit for grading' }).click();
  await page.getByRole('button', {name:'Correct! Continue to the next assignment' }).click({ timeout: 30000});
  await expect(page.getByText(secondAssignment)).toBeVisible({ timeout: 30000} );
});

