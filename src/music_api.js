import qs from 'querystring'

const search = (Vue = null, name = null, limit = null, callback = null) => {
    var data = {
        's': name,
        'csrf_token': '',
        'type': 1,
        'offset': 0,
        'limit': limit,
        'total': true
    }
    var that = this
    Vue.$http.post('/api/search/get/web', qs.stringify(data)).then((response) => {
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

let api = {
  search: search,
  detail: detail
}
module.exports = {api}