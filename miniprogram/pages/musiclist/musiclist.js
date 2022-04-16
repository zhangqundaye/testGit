// pages/musiclist/musiclist.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: '',
        musicName: '',
        musiclist: [],
        selectId: -1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        console.log(options.id)
        wx.showLoading({
            title: '加载中',
        })
        await this.getMusiclist(options.id)
        wx.hideLoading()

    },
    getMusiclist: async function (id) {
        const {
            result
        }
        = await wx.cloud.callFunction({
            name: 'musicModel',
            data: {
                $url: 'musiclist',
                id
            }
        })
        console.log(result)
        this.setData({
            imgUrl: result.coverImgUrl,
            musicName: result.name,
            musiclist: result.tracks
        })
        wx.setStorageSync('musiclist', this.data.musiclist)
    },
    onTap: function (params) {
        const id = params.target.dataset.id
        this.setData({
            selectId: id
        })
        wx.navigateTo({
            url: `/pages/musicplay/musicplay?id=${id}`,
        })
    }
})