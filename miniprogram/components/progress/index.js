const BackgroundAudioManager = wx.getBackgroundAudioManager()
let duration = 0
let disValue = 0
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        time: {
            currentTime: '00:00',
            totalTime: '00:00'
        },
        currentValue: 0
    },

    lifetimes: {
        ready: function () {
            // 在组件实例进入页面节点树时执行
            this._bindBAGEvent()

        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    /**
     * 组件的方法列表
     */
    methods: {
        formTime(time) {
            const sec = Math.floor(time % 60)
            const min = Math.floor((time - sec) / 60)
            return `${this._setTime(min)}:${this._setTime(sec)}`
        },
        _setTime(sec) {
            return sec < 10 ? `0${sec}` : sec
        },
        _bindBAGEvent() {
            BackgroundAudioManager.onCanplay(() => {
                    console.log(BackgroundAudioManager.duration)
                    duration = BackgroundAudioManager.duration
                    if (duration === undefined) {
                        setTimeout(() => {
                            duration = BackgroundAudioManager.duration
                            this.setData({
                                ['time.totalTime']: this.formTime(duration)
                            })
                        }, 1000);
                    } else {
                        this.setData({
                            ['time.totalTime']: this.formTime(duration)
                        })
                    }

                }),
                BackgroundAudioManager.onTimeUpdate(this.throttle(this.handle, 1000))
        },
        throttle(fn, wait) {
            var timer = null;
            return ()=> {
                const that = this
                if (!timer) {
                    timer = setTimeout(()=> {
                        fn.apply(that)
                        timer = null;
                    }, wait)
                }
            }
        },
        handle() {
            let currentValue = Math.floor(BackgroundAudioManager.currentTime / duration * 100)
            if (currentValue !== disValue) {
                this.setData({
                    currentValue,
                    ['time.currentTime']:this.formTime(Math.floor(BackgroundAudioManager.currentTime))
                })
            }
        }
    }
})