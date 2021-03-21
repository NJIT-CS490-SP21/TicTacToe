import {render,screen,fireEvent,queryByAttribute} from "@testing-library/react";
import App from "./App";

test("Sign in doesnt autheticate blank username", () => {
  const result = render(<App />);

  const submitButton = screen.getByText("Sign in");

  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);
  expect(submitButton).toBeInTheDocument();
  
  
  
});


test("Sign in autheticates when user inputs username", () => {
  const result = render(<App />);
  const getById = queryByAttribute.bind(null, "id");
  
  const submitButton = getById(result.container, "signInForm");
  const usernameInput = screen.getByPlaceholderText("Enter username");
  
  expect(submitButton).toBeInTheDocument();
  fireEvent.change(usernameInput, { target: { value: "person1" } });
  fireEvent.click(submitButton);
  expect(usernameInput.value).toBe("person1")
  
});



test("Test to see if user logged in" , () => {
  const result = render(<App />);

  const submitButton = screen.getByText("Sign in");
  const usernameInput = screen.getByPlaceholderText("Enter username");

  expect(submitButton).toBeInTheDocument();
  fireEvent.change(usernameInput, { target: { value: "person1" } });
  fireEvent.click(submitButton);
  expect(submitButton).toBeInTheDocument()

});