// components/popup/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 控制弹出层是否显示
    show: {
      type: Boolean,
      value: false
    },
    content: {
      type: String,
      value: "按钮"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      wx.getUserProfile({
        desc: '微信授权',
        // 用户确认授权
        success: (res) => {
          this.triggerEvent('getUserProfile',res)
        },
        //用户拒绝授权
        fail: () => {
          wx.showModal({
            content: '授权才能发布',
            success: (res) => {
              if (res.confirm) {
                this.setData({
                  show: true
                })
              }
            },
            fail: (err) => {
              console.log(err)
            }
          })
        },
        //关闭弹出层
        complete: () => {
          this.setData({
            show: false
          })
        }
      })
    }
  }
})