const cfg = require('../config.js');
const userBooksUrl = '/book/user/';
const coll = '/collections';
const bookUrl = '/book';
const userUrl = '/user';

module.exports = {
  username: cfg.name,

  // 通过起始值和数量获取该用户的图书
  getBooks(start = 0, count = 10) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${cfg.baseUrl + userBooksUrl + this.username + coll}?start=${start}&${count}`,
        header: {
          "Content-Type": "json"
        },
        success: res => {
          resolve(res.data.collections);
        },
        fail: res => {
          reject(res);
        }
      })
    })
  },

  // 通过图书ID获取图书详情
  getBook(id) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${cfg.baseUrl + bookUrl}/${id}`,
        header: {
          "Content-Type": "json"
        },
        success: res => {
          resolve(res.data);
        },
        fail: res => {
          reject(res);
        }
      })
    })
  },

  getUser() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${cfg.baseUrl + userUrl}/${this.username}`,
        header: {
          'Content-Type': 'json'
        },
        success: res => {
          resolve(res.data);
        },
        fail: res => {
          reject(res);
        }
      })
    })
  },

  setUsername(name) {
    this.username = name;
  }
}