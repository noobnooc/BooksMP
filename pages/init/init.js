// pages/init/init.js
const app = getApp();

Page({
  username: '',

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onInputUsername(e) {
    this.username = e.detail.value;
  },

  startUse() {
    if (!/^(\w)+/.test(this.username)) {
      wx.showToast({
        title: '用户名格式错误',
      })
      return;
    }
    this.setUsername(this.username);
  },

  useDefault() {
    this.setUsername('hardo');
  },
  setUsername(username) {
    wx.showLoading({
      title: '设置中...',
    });
    app.setUsername(username)
      .then(() => {
        wx.setStorageSync('init', true);
        wx.hideLoading();
        wx.switchTab({
          url: '/pages/index/index',
        })
      })
      .catch(err => {
        wx.showToast({
          title: err,
        })
      })
  }
})