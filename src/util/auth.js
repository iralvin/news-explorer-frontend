const baseUrl = "https://www.api.alvin.students.nomoreparties.site/";

const register = (email, password, name) => {
  return fetch(`${baseUrl}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then((data) => {
    console.log("response");
    console.log(data);

    if (data.ok) {
      return data.json();
    }
  });
  // .catch((err) => {
  //   console.log('failed to create user');
  // });
};

const login = (email, password) => {
  return fetch(`${baseUrl}signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      console.log("res", res);

      if (res.ok) {
        console.log("res", res);
        return res.json();
      }
    })
    .then((data) => {
      console.log("data", data);
      if (data) {
        localStorage.setItem("token", data.token);
        return data;
      }
    });
  // .catch((err) => {
  //   console.log('failed to login');
  // });
};

const checkToken = (token) => {
  return fetch(`${baseUrl}users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

export { register, login, checkToken };
