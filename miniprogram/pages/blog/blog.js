// pages/blog/blog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    show: false
  },
  // 发布按钮
  onPublish() {
    // 判断是否有用户信息
    if (!this.data.hasUserInfo) {
      // 没有用户信息弹出授权框
      this.setData({
        show: true
      })
    } else {
      // todo
      wx.navigateTo({
        url: '../blog-edit/blog-edit',
        success: (res) => {
          res.eventChannel.emit('userInfo', this.data.userInfo)
        }
      })
    }
  },
  getUserProfile(event) {
    const {
      detail: {
        userInfo
      }
    } = event
    this.setData({
      userInfo,
      hasUserInfo: true
    })
    wx.navigateTo({
      url: '../blog-edit/blog-edit',
      success: (res) => {
        res.eventChannel.emit('userInfo', this.data.userInfo)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})