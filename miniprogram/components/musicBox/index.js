// components/musicBox/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        musicInfo: Object
    },
    observers: {
        'musicInfo.playCount': function (value) {
            this.numberFormat(value)
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        playCount: '',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        numberFormat: function (value) {
            var param = {};
            var k = 10000,
                sizes = ['', '万', '亿', '万亿'],
                i;
            if (value < k) {
                param.value = value
                param.unit = ''
            } else {
                i = Math.floor(Math.log(value) / Math.log(k));

                param.value = ((value / Math.pow(k, i))).toFixed(2);
                param.unit = sizes[i];
            }
            this.setData({
                playCount: param.value+param.unit
            })
        }
    }
})