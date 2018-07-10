const api = require("utils/api.js");

//app.js
App({
  // 更新数据后需要调用的回调函数列表
  refreshListenerList: new Set(),

  onLaunch: function() {
    // 初始化数据
    let username = wx.getStorageSync("username") || "hardo";
    api.setUsername(username);
    let user = wx.getStorageSync("user") || { name: "Hardo" };
    this.globalData.user = user;
    let books = wx.getStorageSync("books") || [];
    this.globalData.books = books;
    this.fetchData();
    this.fetchUser();
  },
  fetchData() {
    return new Promise((resolve, reject) => {
      api
        .getBooks(0, 10)
        .then(books => {
          this.globalData.books = books;
          wx.setStorageSync("books", books);
          this.onRefresh();
          resolve(books);
        })
        .catch(reject);
    });
  },
  fetchUser() {
    return new Promise((resolve, reject) => {
      api
        .getUser()
        .then(res => {
          this.globalData.user = res;
          wx.setStorageSync('user', res);
          this.onRefresh();
          resolve(res);
        })
        .catch(reject);
    });
  },
  onRefresh() {
    for (let listener of this.refreshListenerList) {
      if (typeof listener === "function") {
        listener();
      }
    }
  },
  addOnRefreshListener(listener) {
    this.refreshListenerList.add(listener);
  },
  removeOnRefreshListener(listener) {
    this.refreshListenerList.delete(listener);
  },
  globalData: {
    books: [],
    user: {}
  },

  setUsername(username) { 
    return new Promise((resolve, reject) => {
      wx.setStorageSync('username', username);
      api.setUsername(username);
      this.fetchUser()
        .then(() => {
          this.fetchData().then(resolve);
        })
        .catch(reject);
    })
  }
});
