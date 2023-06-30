import { render, screen, fireEvent } from "@testing-library/react";
import { AddNewLocationItem } from "./AddNewLocationItem";

test("renders AddNewLocationItem component", () => {
  render(
    <AddNewLocationItem setSavedLocations={() => {}} savedLocations={[]} />
  );

  const addNewLocationElement = screen.getByText(/ADD NEW LOCATION/i);
  expect(addNewLocationElement).toBeInTheDocument();
});

test("displays input field when clicked", () => {
  render(
    <AddNewLocationItem setSavedLocations={() => {}} savedLocations={[]} />
  );

  const addNewLocationElement = screen.getByText(/ADD NEW LOCATION/i);
  fireEvent.click(addNewLocationElement);

  const inputElement = screen.getByTestId("input");
  expect(inputElement).toBeInTheDocument();
});

test("adds a new location when form is submitted", () => {
  const setSavedLocationsMock = jest.fn();
  render(
    <AddNewLocationItem
      setSavedLocations={setSavedLocationsMock}
      savedLocations={[]}
    />
  );

  const addNewLocationElement = screen.getByText(/ADD NEW LOCATION/i);
  fireEvent.click(addNewLocationElement);

  const inputElement = screen.getByTestId("input");
  fireEvent.change(inputElement, { target: { value: "New Location" } });

  const formElement = screen.getByTestId("form");
  fireEvent.submit(formElement);

  expect(setSavedLocationsMock).toHaveBeenCalledWith([
    { name: "New Location", id: expect.any(String) },
  ]);
});
