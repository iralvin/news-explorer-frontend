const newsApiKey = "66c76d6a626b4e74a20ef60d3c03128a";

class Api {
  constructor() {
    this._baseUrl = "https://www.api.alvin.students.nomoreparties.site/";
    this._newsTopUrl = "http://newsapi.org/v2/top-headlines?";
    this._newsSearchUrl = "http://newsapi.org/v2/everything?";
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

  getNewsSearchedArticles(query) {
    console.log(`search for query ${query}`);
    return fetch(`${this._newsSearchUrl}q=${query}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer 66c76d6a626b4e74a20ef60d3c03128a",
      },
    }).then((res) => {
      // console.log("search articles res", res);
      // return res.json()
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

const api = new Api();

export default api;

// http://newsapi.org/v2/everything?q=Apple&from=2020-12-19&sortBy=popularity&apiKey=66c76d6a626b4e74a20ef60d3c03128a
