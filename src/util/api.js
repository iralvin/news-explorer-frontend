const newsApiKey = "66c76d6a626b4e74a20ef60d3c03128a";

class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  getSavedArticles(token, user) {
    return fetch(`${this._baseUrl}articles/${user._id}`, {
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
  }

  // GET user data after logged in
  // GET user saved articles

  // POST saved article to user data

  // GET news articles
}

const api = new Api("https://www.api.alvin.students.nomoreparties.site/");

export default api;
