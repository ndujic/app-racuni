import { customFetch } from "../api";

export function OsvjeziPostavke(data) {
  console.log("Data:", data);
  return customFetch("/api/postavke/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
