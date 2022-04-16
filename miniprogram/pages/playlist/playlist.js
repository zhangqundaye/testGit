const MAX_LIMIT = 12
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: [{
        url: 'http://p1.music.126.net/oeH9rlBAj3UNkhOmfog8Hw==/109951164169407335.jpg',
      },
      {
        url: 'http://p1.music.126.net/xhWAaHI-SIYP8ZMzL9NOqg==/109951164167032995.jpg',
      },
      {
        url: 'http://p1.music.126.net/Yo-FjrJTQ9clkDkuUCTtUg==/109951164169441928.jpg',
      }
    ],
    musicInfo: [],
    flag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //下载歌单信息
    this.loadPlaylist(0, MAX_LIMIT)
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
    this.setData({
      musicInfo: []
    })
    this.data.flag = true
    this.loadPlaylist(0, MAX_LIMIT)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadPlaylist(this.data.musicInfo.length, MAX_LIMIT)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getMusiclist: function (params) {
    const id = params.target.dataset.id
    console.log(id)
    id && wx.navigateTo({
      url: `../musiclist/musiclist?id=${id}`,
    })
  },
  loadPlaylist: async function (skip, limit) {
    if (!this.data.flag) return
    this.data.flag = false
    const {
      result: {
        data
      }
    } = await wx.cloud.callFunction({
      name: 'musicModel',
      data: {
        $url: 'playlist',
        skip,
        limit
      }
    })

    this.setData({
      musicInfo: this.data.musicInfo.concat(data)
    })
    this.data.flag = true
    if (data < MAX_LIMIT) this.data.flag = false
  }
})