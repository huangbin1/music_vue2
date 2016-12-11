import qs from 'querystring'

const search = (Vue = null, name = null, limit = null, callback = null) => {
    var data = {
        'q': name,
        'start': 0,
        'count': limit,
    }
    var that = this
    Vue.$http.get('/api/v2/music/search', {
        params:data}).then((response) => {
        // 响应成功回调
        callback&&callback(response)
    }, (response) => {
        console.log('error response')
            // 响应错误回调
    })
}

const detail = (Vue = null, id = null, callback = null) => {
    var that = this
    Vue.$http.get("/api/song/detail?id="+id+"&ids="+'%5B'+id+'%5D').then((response) => {
        // 响应成功回调
        callback&&callback(response)
    }, (response) => {
        console.log('error response')
            // 响应错误回调
    })
}

const lyric = (Vue = null, id = null, callback = null) => {
    var that = this
    Vue.$http.get("/api/song/lyric?os=pc&id="+id+'&lv=-1&kv=-1&tv=-1').then((response) => {
        // 响应成功回调
        callback&&callback(response)
    }, (response) => {
        console.log('error response')
            // 响应错误回调
    })
}

let api = {
  search: search,
  detail: detail,
  lyric:  lyric
}
module.exports = {api}