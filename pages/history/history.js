const api = require('../../utils/api.js');
const app = getApp();

// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.books.length === 0) {
      wx.showLoading({
        title: '加载中...',
      });
    } else {
      this.onData(app.globalData.books);
    }
    app.fetchData()
      .then(this.onData)
  },

  onData(books) {
    books = app.globalData.books.map((book) => {
      book.book.tags = book.book.tags.slice(0, 4);
      return book;
    })
    this.setData({
      books
    });
    wx.hideLoading();
    wx.stopPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    app.fetchData()
      .then(books => {
        this.onData(books);
        wx.showToast({
          title: '刷新成功！',
        })
      }).catch(err => {
        wx.showToast({
          title: '刷新失败！请重试',
        })
        wx.stopPullDownRefresh();
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showNavigationBarLoading();
    api.getBooks(this.data.books.length, 20)
      .then(books => {
        let obooks = this.data.books;
        books.map(book => {
          book.book.tags = book.book.tags.slice(0, 4);
          obooks.push(book);
        })
        this.setData({
          books: obooks
        })
        wx.hideNavigationBarLoading();
        wx.showToast({
          title: '已加载更多',
        })
      }).catch(err => wx.hideNavigationBarLoading());
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})