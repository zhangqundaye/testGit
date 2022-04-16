// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const axios = require('axios')
const db = cloud.database()
const URL = 'https://apis.imooc.com/personalized?icode=F4C29BBD6577580E'
// 云函数入口函数
exports.main = async (event, context) => {

    //从远程服务器获取数据
    const {
        data
    } = await axios.get(URL)

    if (data.code >= 1000) { //判断获取数据是否成功
        console.log(data.mag)
        return 0
    }

    let playlist = data.result

    if (playlist.length > 0) { //判断获取的数据是否为空
        //从数据库获取数据
        const {
            data
        } = await db.collection('playlist').get()

        const newVaule = data.length > 0 ? difference(playlist, data, 'id') : playlist

        newVaule.forEach(item => {
            item.creatTime = db.serverDate()
        });

        db.collection('playlist').add({
            data: [...newVaule]
        })
    }
}

function difference(arr1, arr2, type) {
    return arr1.filter(item => {
        return arr2.every(list => {
            return item[type] !== list[type]
        });
    })
}