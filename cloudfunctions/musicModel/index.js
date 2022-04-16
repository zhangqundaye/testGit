// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const TcbRouter = require('tcb-router')
const axios = require('axios')
const BASE_URL = 'https://apis.imooc.com'
const ICODE = 'icode=F6B612E6838440BB'

// 云函数入口函数
exports.main = async (event, context) => {

  const app = new TcbRouter({
    event
  })
  
  //从数据库获取音乐库
  app.router('playlist', async (ctx, next) => {
    const {
      data
    } = await db.collection('playlist').orderBy('creatTime', 'desc').skip(event.skip).limit(event.limit).get()
    ctx.body = {
      data
    }
  })
  //获取歌单信息
  app.router('musiclist', async (ctx, next) => {
    const {
      data: {
        playlist
      }
    } = await axios.get(`${BASE_URL}/playlist/detail?${ICODE}&id=${event.id}`)
    ctx.body = playlist
  })
  
  //歌曲播放地址
  app.router('musicplay',async (ctx,next)=>{
    const res = await axios.get(`${BASE_URL}/song/url?${ICODE}&id=${event.id}`)
    ctx.body = res.data.data[0]
  })





  return app.serve()
}