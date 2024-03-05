import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Prijava from "../prijava";

test("Prijava render", () => {
  const fetchSpy = jest.spyOn(window, "fetch");
  const component = render(
    <Router>
      <Prijava />
    </Router>
  );
  expect(component.container).toHaveTextContent(
    "Nemate račun? Registrirajte se odmah!"
  );

  const email = component.container.querySelector("#email");
  const lozinka = component.container.querySelector("#lozinka");

  expect(email).toBeDefined();
  expect(lozinka).toBeDefined();

  const prijaviBotun = component.getByRole("button");

  expect(prijaviBotun).toBeDefined();

  fireEvent.change(email, { target: { value: "peroperic1@gmail.com" } });
  fireEvent.change(lozinka, { target: { value: "pero123" } });

  fireEvent.click(prijaviBotun);

  expect(fetchSpy).toHaveBeenCalled();
  expect(fetchSpy.mock.lastCall[1].body).toEqual(
    JSON.stringify({
      email: "peroperic1@gmail.com",
      lozinka: "pero123",
    })
  );
});
