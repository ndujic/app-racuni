function odjava() {
  localStorage.removeItem("authToken");
  window.location.href = "/";
}

export function customFetch(resource, init = {}, auth = true) {
  return fetch("http://localhost:3001" + resource, {
    ...init,
    ...(auth
      ? {
          headers: {
            ...(init.headers ? init.headers : {}),
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        }
      : {}),
  }).then((res) => {
    if (res.status === 401) {
      odjava();
    }
    if (res.status >= 400) {
      return res.json().then((data) => {
        let message = "Greška";
        if (data && data.message) {
          message = data.message;
        }
        throw new Error(message);
      });
    }
    return res.json();
  });
}
