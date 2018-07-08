const api = require('../../utils/api.js');
const app = getApp();

// pages/history/history.js
Page({

  loading: false,
  lastIndex: 0,
  lastDate: Date.now(),

  refreshData() {
    this.lastIndex = 0;
    this.lastDate = Date.now();
    this.setData({ timeline: [] });
  },

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    hasMore: true,
    timeline: [],
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
      if (this.shouldShowDate(book.updated)) {
        let timeline = this.data.timeline;
        timeline.push(this.lastIndex);
        this.setData({ timeline });
      }
      this.lastIndex++;
      return book;
    })
    this.setData({
      books
    });
    wx.hideLoading();
    wx.stopPullDownRefresh();
  },

  shouldShowDate(date) {
    var dateStr = date.trim().split(' ')[0];
    var newDate = Date.parse(dateStr);
    if (newDate < this.lastDate) {
      this.lastDate = newDate;
      return true;
    }
    return false;
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
        this.refreshData();
        this.onData(books);
        wx.showToast({
          title: '刷新成功！',
        })
        this.setData({ hasMore: true })
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
    if (!this.data.hasMore || this.loading) {
      return;
    }
    wx.showNavigationBarLoading();
    this.loading = true;
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
        if (!books || books.length < 20) {
          this.setData({ hasMore: false });
        }
        wx.hideNavigationBarLoading();
        this.loading = false;
      }).catch(err => wx.hideNavigationBarLoading());
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})