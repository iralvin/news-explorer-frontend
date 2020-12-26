
class Api {
  constructor() {
    this._searchFromDate = new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000
    ).toISOString();
    this._currentDate = new Date(Date.now()).toISOString();
    this._baseUrl = 'https://www.api.alvin.students.nomoreparties.site/';
    this._newsTopUrl = 'http://newsapi.org/v2/top-headlines?';
    this._newsSearchUrl = `http://newsapi.org/v2/everything?language=en&pageSize=100&sortBy=publishedAt&from=${this._searchFromDate}&to=${this._currentDate}&`;
  }

  getNewsSearchedArticles(query) {
    return fetch(`${this._newsSearchUrl}q=${query}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer 66c76d6a626b4e74a20ef60d3c03128a'
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  getSavedArticles(user, token) {
    return fetch(`${this._baseUrl}articles/${user._id}`, {
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
  }

  saveArticle(keyword, article, user, token) {
    return fetch(`${this._baseUrl}articles/${user._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        keyword: keyword.charAt(0).toUpperCase() + keyword.slice(1),
        title: article.title,
        text: article.description,
        link: article.url,
        image: !article.urlToImage
          ? 'https://s3.amazonaws.com/speedsport-news/speedsport-news/wp-content/uploads/2018/07/01082232/image-not-found.png'
          : article.urlToImage,
        source: article.source.name,
        date: new Date(article.publishedAt)
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  deleteArticle(article, user, token) {
    return fetch(`${this._baseUrl}articles/${user._id}/${article._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
}

const api = new Api();

export default api;

// http://newsapi.org/v2/everything?q=Apple&from=2020-12-19&sortBy=popularity&apiKey=66c76d6a626b4e74a20ef60d3c03128a
