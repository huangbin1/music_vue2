import qs from 'querystring'

let toplist = [{
    name: '云音乐新歌榜',
    url: '/discover/toplist?id=3779629',
    imgUrl: 'http://p3.music.126.net/LRtxrRfP3g6Gn3vyvWEXOw==/7808731581312441.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: '云音乐热歌榜',
    url: '/discover/toplist?id=3778678',
    imgUrl: 'http://p4.music.126.net/eSXJexcoihfSe8ERgOdMnQ==/2920302885027135.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: '网易原创歌曲榜',
    url: '/discover/toplist?id=2884035',
    imgUrl: 'http://p3.music.126.net/LgoU8FreFrdLvSY3ZTFu5g==/2902710698975677.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: '云音乐飙升榜',
    url: '/discover/toplist?id=19723756',
    imgUrl: 'http://p3.music.126.net/TkNqminF5jTCzk12Mf5Acg==/7744959906898786.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: '云音乐电音榜',
    url: '/discover/toplist?id=10520166',
    imgUrl: 'http://p3.music.126.net/5z9yfCsZ7bvTKUNN-jxqow==/7856010581293779.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: 'UK排行榜周榜',
    url: '/discover/toplist?id=180106',
    imgUrl: 'http://p3.music.126.net/sNdnRpXmCwFsAj2EX4-OVw==/5666882929660308.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: '美国Billboard周榜',
    url: '/discover/toplist?id=60198',
    imgUrl: 'http://p3.music.126.net/koBrRZkYaqrXfep4zr420g==/6058309069460360.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: 'KTV嗨榜',
    url: '/discover/toplist?id=21845217',
    imgUrl: 'http://p3.music.126.net/UN8g4epoFk-I4DV_C8w32A==/2922501907760617.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: 'iTunes榜',
    url: '/discover/toplist?id=11641012',
    imgUrl: 'http://p3.music.126.net/hM7U6d25M3oj7tajgcnRjg==/5790028232058309.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: 'Hit FM Top榜',
    url: '/discover/toplist?id=120001',
    imgUrl: 'http://p3.music.126.net/YqwesOCRe9KPuA4rRQIhfg==/5684475115701568.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: '日本Oricon周榜',
    url: '/discover/toplist?id=60131',
    imgUrl: 'http://p4.music.126.net/vEaaj-nECgH7kjBRT1DlQA==/5684475115701565.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: '韩国Melon排行榜周榜',
    url: '/discover/toplist?id=3733003',
    imgUrl: 'http://p3.music.126.net/9YSGHPRdVazKSiNGl3uwpg==/5920870115713082.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: '韩国Mnet排行榜周榜',
    url: '/discover/toplist?id=60255',
    imgUrl: 'http://p3.music.126.net/tSl2BF3dZi4cLMD70_fYLw==/5739450697092147.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: '韩国Melon原声周榜',
    url: '/discover/toplist?id=46772709',
    imgUrl: 'http://p3.music.126.net/v_cgiZ305WeM4GJiGIOu7Q==/7815328650414104.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: '中国TOP排行榜(港台榜)',
    url: '/discover/toplist?id=112504',
    imgUrl: 'http://p4.music.126.net/1MzrbY-8PvvDgFah3uCMig==/5739450697092148.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: '中国TOP排行榜(内地榜)',
    url: '/discover/toplist?id=64016',
    imgUrl: 'http://p3.music.126.net/QjYkd-QFVv6e-34_gyePCw==/1269935930127361.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: '香港电台中文歌曲龙虎榜',
    url: '/discover/toplist?id=10169002',
    imgUrl: 'http://p3.music.126.net/TUJxLWCg2WIlFpvyobXlaQ==/6020925673858141.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: '华语金曲榜',
    url: '/discover/toplist?id=4395559',
    imgUrl: 'http://p4.music.126.net/2YXiTGtOn2GwSl4iUfQOHQ==/5985741301868412.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: '中国嘻哈榜',
    url: '/discover/toplist?id=1899724',
    imgUrl: 'http://p3.music.126.net/8gUF9TrXGNoRO6cKVaCzrQ==/5972547162256485.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: '法国 NRJ EuroHot 30周榜',
    url: '/discover/toplist?id=27135204',
    imgUrl: 'http://p4.music.126.net/kn5Nb3HA-8c3y-KYVVDk-w==/6623458046388376.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: '台湾Hito排行榜',
    url: '/discover/toplist?id=112463',
    imgUrl: 'http://p4.music.126.net/s09Lt4X_6ckE1lpFHOc2tQ==/5952755952970970.jpg?param=150y150',
    songs_id: [],
    songs: []
}, {
    name: 'Beatport全球电子舞曲榜',
    url: '/discover/toplist?id=3812895',
    imgUrl: 'http://p4.music.126.net/VxjQ-nTkeAIcFdXSKbNMug==/1240249116178109.jpg?param=150y150',
    songs_id: [],
    songs: []
}]
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

const toplist_new = function(Vue = null, toplist = null, callback = null) {
    let that = this
    if (toplist == '' || toplist == null) {
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
    toplist_new: toplist_new,
    toplist: toplist
}
module.exports = { api }