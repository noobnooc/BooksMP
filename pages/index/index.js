//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    book: {},
  },

  onLoad() {
    if (!app.globalData.books[0]) {
      wx.showLoading({
        title: '加载中！',
      });
    } else {
      this.setData({
        book: app.globalData.books[0]
      })
    }
    app.fetchData()
      .then(this.onData)
  },

  onData(books) {
    this.setData({
      book: books[0]
    });
    let topbar = 'Hardo 最近在看的书'
    if (this.data.book.status === 'read') {
      topbar = 'Hardo 最近看过的书'
    } else if (this.data.book.status === 'wish') {
      topbar = 'Hardo 最近想看的书'
    }
    wx.setNavigationBarTitle({
      title: topbar,
    })
    wx.hideLoading();
    wx.stopPullDownRefresh();
  },

  // 点击封面跳转到详情页
  bindCoverTap: function() {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${this.data.book.book_id}`
    })
  },

  onPullDownRefresh() {
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
  }
})