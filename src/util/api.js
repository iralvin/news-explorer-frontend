import { apiKey, fromNumberDays } from '../constants/constants';
import moment from "moment"

class Api {
  constructor() {
    this._dateFormat = "YYYY-MM-DD";
    this._searchFromDate = moment().subtract(fromNumberDays, "days").format(this._dateFormat);
    this._currentDate = moment().format(this._dateFormat)
    this._baseUrl = 'https://api.y-alvin.students.nomoreparties.site/';
    // this._newsTopUrl = 'https://newsapi.org/v2/top-headlines?';
    this._newsSearchUrl = `https://nomoreparties.co/news/v2/everything?language=en&pageSize=100&sortBy=publishedAt&from=${this._searchFromDate}&to=${this._currentDate}&apiKey=${apiKey}&`;
  }

  getNewsSearchedArticles(query) {
    return fetch(`${this._newsSearchUrl}q=${query}`, {
      method: 'GET'
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