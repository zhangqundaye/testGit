const MAX_WORDSNUM = 140;
let {
  Watch
} = require('../../until.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    word: '',
    wordsNum: '',
    floorBottom: 0,
    userInfo: {},
    tempFilePaths: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //监听
    Watch.setWatcher(this)
    // 传递来的用户数据
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.once('userInfo', (res) => {
      this.setData({
        userInfo: res
      })
    })
  },
  // 监听器
  watch: {
    word(a) {
      const len = a.length
      this.setData({
        wordsNum: len >= MAX_WORDSNUM ? `最多字数不能超过${MAX_WORDSNUM}` : len
      })
    }
  },
  //文本区获得焦点改变发布按钮距离
  onFocus(event) {
    this.setData({
      floorBottom: event.detail.height
    })
  },
  //文本区失去焦点改变发布按钮距离
  onBlur() {
    this.setData({
      floorBottom: 0
    })
  },
  // 添加照片
  selectImg(e) {
    const len = this.data.tempFilePaths.length + e.detail.tempFilePaths.length
    if (len > 9) {
      wx.showToast({
        title: '图片不能超过9张',
        icon:"error",
        duration:1500,
      })
    } else {
      this.setData({
        tempFilePaths: this.data.tempFilePaths.concat(e.detail.tempFilePaths)
      })
    }


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