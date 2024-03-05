import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Registracija from "../registracija";

test("Registracija render", () => {
  const fetchSpy = jest.spyOn(window, "fetch");
  const component = render(
    <Router>
      <Registracija />
    </Router>
  );
  expect(component.container).toHaveTextContent(
    "Već imate račun? Prijavite se!"
  );

  const ime = component.container.querySelector("#ime");
  const email = component.container.querySelector("#email");
  const lozinka = component.container.querySelector("#lozinka");

  expect(ime).toBeDefined();
  expect(email).toBeDefined();
  expect(lozinka).toBeDefined();

  const prijaviBotun = component.getByRole("button");

  expect(prijaviBotun).toBeDefined();

  fireEvent.change(ime, { target: { value: "nina" } });
  fireEvent.change(email, { target: { value: "nina1@gmail.com" } });
  fireEvent.change(lozinka, { target: { value: "sifra123" } });

  fireEvent.click(prijaviBotun);

  expect(fetchSpy).toHaveBeenCalled();
  expect(fetchSpy.mock.lastCall[1].body).toEqual(
    JSON.stringify({
      ime: "nina",
      email: "nina1@gmail.com",
      lozinka: "sifra123",
    })
  );
});
