import {render,screen,fireEvent,queryByAttribute,} from "@testing-library/react";
import App from "./App";

test("Login still there for blank username", () => {
  const result = render(<App />);

  const submitButton = screen.getByText("Sign in");

  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);
  expect(submitButton).toBeInTheDocument();
  
  
  
});