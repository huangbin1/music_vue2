import qs from 'querystring'

const search = (Vue = null, name = null, limit = null, callback = null) => {
    let data = {
        's': name,
        'csrf_token': '',
        'type': 1,
        'offset': 0,
        'limit': limit,
        'total': true
    }
    let that = this
    Vue.$http.post('/api/search/pc', qs.stringify(data)).then((response) => {
        // 响应成功
        if (response.body.code != 200) {
            console.log("response code != 200")
            return
        }
        callback && callback(response)
    }, (response) => {
        // 响应错误
        console.log('error response')

    })
}

const detail = (Vue = null, id = null, callback = null) => {
    let that = this
    Vue.$http.get("/api/song/detail?id=" + id + "&ids=" + '%5B' + id + '%5D').then((response) => {
        // 响应成功回调
        callback && callback(response)
    }, (response) => {
        console.log('error response')
            // 响应错误回调
    })
}

const toplist_new = function(Vue = null, toplist = null, callback = null){
    let that = this
    if(toplist == '' || toplist == null)
    {
        console.log("toplist string is empty")
        return
    }
    Vue.$http.get(toplist).then((response) => {
        // 响应成功
        callback && callback(response)
    }, (response) => {
        console.log('error response')
            // 响应错误回调
    })
}
const lyric = (Vue = null, id = null, callback = null) => {
    let that = this
    Vue.$http.get("/api/song/lyric?os=pc&id=" + id + '&lv=-1&kv=-1&tv=-1').then((response) => {
        // 响应成功回调
        callback && callback(response)
    }, (response) => {
        console.log('error response')
            // 响应错误回调
    })
}

let api = {
    search: search,
    detail: detail,
    lyric: lyric,
    toplist_new: toplist_new
}
module.exports = { api }