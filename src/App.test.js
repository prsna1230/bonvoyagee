import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux-store/store";
test("renders hotel link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const hotellinkElement = screen.getByText(/hotel/i);
  expect(hotellinkElement).toBeInTheDocument();
});
// flight
test("renders flight link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const flightlinkElement = screen.getByText(/flight/i);
  expect(flightlinkElement).toBeInTheDocument();
});
// holiday
test("renders holiday link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const holidaylinkElement = screen.getByText(/holiday/i);
  expect(holidaylinkElement).toBeInTheDocument();
});
