const BackgroundAudioManager = wx.getBackgroundAudioManager()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        playInfo: {},
        playing: false,
        currentIndex: -1,
        musicList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        //获取缓存数据
        const res = wx.getStorageSync('musiclist')
        this.data.musicList = res
        const indexId = res.findIndex((item) => item.id == options.id)
        //从服务器获取歌曲数据
        await this._loadingMusicDetail(indexId)

        BackgroundAudioManager.onEnded(this.onNext)
        BackgroundAudioManager.onPlay(() => {
            this.setData({
                playing: true
            })
        })
        BackgroundAudioManager.onPause(() => {
            this.setData({
                playing: false
            })
        })
    },
    async _loadingMusicDetail(indexId) {
        await wx.showLoading({
            title: '加载中',
        })
        this.setData({
            playing: false
        })


        const result = this.data.musicList[indexId]
        this.data.currentIndex = indexId
        //设置Bar
        wx.setNavigationBarTitle({
            title: result.name || '无名',
        })
        //获取歌曲照片
        this.setData({
            playInfo: result
        })
        //获取歌曲播放地址
        await wx.cloud.callFunction({
            name: 'musicModel',
            data: {
                $url: 'musicplay',
                id: result.id
            }
        }).then((res) => {
            const data = res.result
            this.setData({
                playing: true
            })
            BackgroundAudioManager.src = data.url //音乐url
            BackgroundAudioManager.title = result.name //音乐title
        })
        wx.hideLoading()
    },
    //播放 暂停
    onPlay() {
        if (this.data.playing) {
            this.setData({
                playing: false
            })
            BackgroundAudioManager.pause()
        } else {
            this.setData({
                playing: true
            })
            BackgroundAudioManager.play()
        }
    },
    //下一首
    onNext() {
        this.data.currentIndex = this.data.currentIndex + 1 < this.data.musicList.length ? this.data.currentIndex + 1 : 0
        this._loadingMusicDetail(this.data.currentIndex)
    },
    //上一首
    onPrev() {
        this.data.currentIndex = this.data.currentIndex - 1 < 0 ? this.data.musicList.length - 1 : this.data.currentIndex - 1
        this._loadingMusicDetail(this.data.currentIndex)
    },

})