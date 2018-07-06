const url = 'https://douban.uieee.com/v2/book/user/bigstud/collections'
module.exports = {
  getBooks(start = 0, count = 10) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${url}?start=${start}&${count}`,
        header: {
          "Content-Type": "json"
        },
        success: (res) => {
          resolve(res.data.collections);
        },
        fail: (res) => {
          reject(res);
        }
      })
    })
  }
}