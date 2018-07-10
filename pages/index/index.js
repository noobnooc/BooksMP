//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    book: {}
  },

  onLoad() {
    app.addOnRefreshListener(this.onRefresh);
    if (!app.globalData.books[0]) {
      wx.showLoading({
        title: "加载中！"
      });
    } else {
      this.onRefresh();
    }
  },

  onShow() {
    let username = app.globalData.user.name;
    let topbar = `${username}最近在看的书`;
    if (this.data.book.status === "read") {
      topbar = `${username}最近看过的书`;
    } else if (this.data.book.status === "wish") {
      topbar = `${username}最近想看的书`;
    }
    wx.setNavigationBarTitle({
      title: topbar
    });
  },

  onUnload() {
    app.removeOnRefreshListener(this.onRefresh);
  },

  onRefresh() {
    let book = app.globalData.books[0];
    this.setData({ book });
    wx.hideLoading();
  },

  // 点击封面跳转到详情页
  bindCoverTap: function() {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${this.data.book.book_id}`
    });
  },

  onPullDownRefresh() {
    app.fetchData().then(() => {
      wx.stopPullDownRefresh();
    });
  }
});
