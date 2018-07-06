const api = require('utils/api.js')

//app.js
App({
  onLaunch: function() {
    // 初始化数据
    var books = wx.getStorageSync('books') || []
    this.globalData.books = books;
  },
  fetchData() {
    return new Promise((resolve, reject) => {
      api.getBooks(0, 10)
        .then((books) => {
          this.globalData.books = books;
          wx.setStorageSync('books', books);
          resolve(books);
        }).catch(res => reject(res));
    })
  },
  globalData: {
    books: [],
  }
})