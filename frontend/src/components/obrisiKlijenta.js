import { customFetch } from "../api";

export function obrisiKlijenta(id) {
  return customFetch("/api/klijenti/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
