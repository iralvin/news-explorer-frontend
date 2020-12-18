import { base } from "../../../api/models/user";

const baseUrl = 'https://www.api.alvin.students.nomoreparties.site/';

const register = (email, password, name) => {
  return fetch(`${baseUrl}signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, name })
  }).then((res) => {
      console.log("response")
    console.log(res);

    if (res.ok) {
      return res.json();
    }
  });
};


const login = (email, password) => {
    return fetch(`${baseUrl}signin`, {
        method:"GET",
        headers:{
            
        }
    })
}

export { register };
