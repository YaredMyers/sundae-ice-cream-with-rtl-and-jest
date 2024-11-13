import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { kebabCaseToTitleCase } from "./helpers.js";

// FUNCTIONAL TESTS
test("button click flow", () => {
  // render App
  render(<App />);

  // Find the button
  const buttonElement = screen.getByRole("button", { name: /blue/i });

  // Check initial color
  expect(buttonElement).toHaveClass("medium-violet-red");

  // Click the button
  fireEvent.click(buttonElement);

  // Check the button text
  expect(buttonElement).toHaveTextContent(/red/i);

  // Check the button color
  expect(buttonElement).toHaveClass("midnight-blue");
});

test("checkbox flow", () => {
  // Render App
  render(<App />);

  // Find the checkbox and the button
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });

  // Check initial condition
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();

  // Click checkbox to disable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("gray");

  // Click checkbox again to enable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("medium-violet-red");
});

test("checkbox flow after button click", () => {
  // render App
  render(<App />);

  // Find elements
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });

  // Click button to change to blue
  fireEvent.click(buttonElement);

  // Click checkbox to disable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("gray");

  // Click checkbox again to enable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("midnight-blue");
});

// UNIT TESTS
describe("kebabCaseToTitleCase", () => {
  test("works for no hyphens", () => {
    expect(kebabCaseToTitleCase("red")).toBe("Red");
  });
  test("works for one hyphens", () => {
    expect(kebabCaseToTitleCase("midnight-blue")).toBe("Midnight Blue");
  });
  test("works for multiple hyphens", () => {
    expect(kebabCaseToTitleCase("medium-violet-red")).toBe("Medium Violet Red");
  });
});
