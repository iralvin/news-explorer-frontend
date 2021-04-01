const baseUrl = 'https://api.awong-news.students.nomoreparties.site/';

const register = (email, password, name) => {
  return fetch(`${baseUrl}signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, name })
  }).then((data) => {
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
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        localStorage.setItem('token', data.token);
        return data;
      }
    });
  // .catch((err) => {
  //   console.log('failed to login');
  // });
};

const checkToken = (token) => {
  return fetch(`${baseUrl}users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

export { register, login, checkToken };
