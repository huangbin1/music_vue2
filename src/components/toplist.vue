<template>
  <div id="top-list">
      <!--<router-link to="/home">About</router-link>-->
    <div class="toplist-item" v-for="item in toplist" @click="show_toplist">
        <img class="toplist-img" :src="item.imgUrl" ></img>
        <div class="toplist-info">
            <div class="toplist-title">{{item.name}}</div>
            <div class="toplist-songs">
                <div class="toplist-badge">
                    <mt-badge size="small" color="red">1</mt-badge>
                    <mt-badge size="small" color="#f9654f">2</mt-badge>
                    <mt-badge size="small" color="#efa79c">3</mt-badge>
                </div>
                <div class="toplist-name" v-if="item.songs.length == 3">
                    <div>{{item.songs[0].name}}</div>
                    <div>{{item.songs[1].name}}</div>
                    <div>{{item.songs[2].name}}</div>
                </div>
            </div>
        </div>
    </div>
    <transition name="page-slide">
        <toplistpage v-if="toplist_page_show"></toplistpage>
    </transition>
  </div>

</template>
<script>
    import {api} from '../music_api.js'
    import TopListPage from './toplist_page.vue'
    export default {
        name: 'top-list',
        components: {
            TopListPage
        },
        data() {
            return {
                toplist_page_show: false,
                toplist: [
                    {
                        name: '云音乐新歌榜',
                        url: '/discover/toplist?id=3779629',
                        imgUrl: 'http://p3.music.126.net/LRtxrRfP3g6Gn3vyvWEXOw==/7808731581312441.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: '云音乐热歌榜', 
                        url: '/discover/toplist?id=3778678',
                        imgUrl: 'http://p4.music.126.net/eSXJexcoihfSe8ERgOdMnQ==/2920302885027135.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: '网易原创歌曲榜',
                        url: '/discover/toplist?id=2884035',
                        imgUrl: 'http://p3.music.126.net/LgoU8FreFrdLvSY3ZTFu5g==/2902710698975677.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: '云音乐飙升榜',
                        url: '/discover/toplist?id=19723756',
                        imgUrl: 'http://p3.music.126.net/TkNqminF5jTCzk12Mf5Acg==/7744959906898786.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: '云音乐电音榜',
                        url: '/discover/toplist?id=10520166',
                        imgUrl: 'http://p3.music.126.net/5z9yfCsZ7bvTKUNN-jxqow==/7856010581293779.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: 'UK排行榜周榜',
                        url: '/discover/toplist?id=180106',
                        imgUrl: 'http://p3.music.126.net/sNdnRpXmCwFsAj2EX4-OVw==/5666882929660308.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: '美国Billboard周榜',
                        url: '/discover/toplist?id=60198',
                        imgUrl: 'http://p3.music.126.net/koBrRZkYaqrXfep4zr420g==/6058309069460360.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: 'KTV嗨榜',
                        url: '/discover/toplist?id=21845217',
                        imgUrl: 'http://p3.music.126.net/UN8g4epoFk-I4DV_C8w32A==/2922501907760617.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: 'iTunes榜',
                        url: '/discover/toplist?id=11641012',
                        imgUrl: 'http://p3.music.126.net/hM7U6d25M3oj7tajgcnRjg==/5790028232058309.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: 'Hit FM Top榜',
                        url: '/discover/toplist?id=120001',
                        imgUrl: 'http://p3.music.126.net/YqwesOCRe9KPuA4rRQIhfg==/5684475115701568.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: '日本Oricon周榜',
                        url: '/discover/toplist?id=60131',
                        imgUrl: 'http://p4.music.126.net/vEaaj-nECgH7kjBRT1DlQA==/5684475115701565.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: '韩国Melon排行榜周榜',
                        url: '/discover/toplist?id=3733003',
                        imgUrl: 'http://p3.music.126.net/9YSGHPRdVazKSiNGl3uwpg==/5920870115713082.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: '韩国Mnet排行榜周榜',
                        url: '/discover/toplist?id=60255',
                        imgUrl: 'http://p3.music.126.net/tSl2BF3dZi4cLMD70_fYLw==/5739450697092147.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: '韩国Melon原声周榜',
                        url: '/discover/toplist?id=46772709',
                        imgUrl: 'http://p3.music.126.net/v_cgiZ305WeM4GJiGIOu7Q==/7815328650414104.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: '中国TOP排行榜(港台榜)',
                        url: '/discover/toplist?id=112504',
                        imgUrl: 'http://p4.music.126.net/1MzrbY-8PvvDgFah3uCMig==/5739450697092148.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: '中国TOP排行榜(内地榜)',
                        url: '/discover/toplist?id=64016',
                        imgUrl: 'http://p3.music.126.net/QjYkd-QFVv6e-34_gyePCw==/1269935930127361.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: '香港电台中文歌曲龙虎榜',
                        url: '/discover/toplist?id=10169002',
                        imgUrl: 'http://p3.music.126.net/TUJxLWCg2WIlFpvyobXlaQ==/6020925673858141.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: '华语金曲榜',
                        url: '/discover/toplist?id=4395559',
                        imgUrl: 'http://p4.music.126.net/2YXiTGtOn2GwSl4iUfQOHQ==/5985741301868412.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: '中国嘻哈榜',
                        url: '/discover/toplist?id=1899724',
                        imgUrl: 'http://p3.music.126.net/8gUF9TrXGNoRO6cKVaCzrQ==/5972547162256485.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: '法国 NRJ EuroHot 30周榜',
                        url: '/discover/toplist?id=27135204',
                        imgUrl: 'http://p4.music.126.net/kn5Nb3HA-8c3y-KYVVDk-w==/6623458046388376.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: '台湾Hito排行榜',
                        url: '/discover/toplist?id=112463',
                        imgUrl: 'http://p4.music.126.net/s09Lt4X_6ckE1lpFHOc2tQ==/5952755952970970.jpg?param=150y150',
                        songs_id: [],
                        songs: []},
                    {
                        name: 'Beatport全球电子舞曲榜',
                        url: '/discover/toplist?id=3812895',
                        imgUrl: 'http://p4.music.126.net/VxjQ-nTkeAIcFdXSKbNMug==/1240249116178109.jpg?param=150y150',
                        songs_id: [],
                        songs: []}
                ],
                toplist_list_id: [],
                toplist_load_ok: false
            }
        },
        methods: {
            show_toplist: function(){
                this.toplist_page_show = true
            },
            get_detail_r: function(pos, cnt) {
                var that = this
                if(cnt >= 3)
                {
                    //console.log("detail enough")
                    if(pos == that.toplist.length - 1)
                        console.log(that.toplist)
                    return
                }
                api.detail(that, that.toplist[pos].songs_id[cnt], (response) => {
                    that.toplist[pos].songs.push(response.body.songs[0])
                    cnt++
                    that.get_detail_r(pos, cnt)
                })
            },
            get_toplist_r: function(cnt) {
                /* 获取音乐榜的音乐id 以及前3首歌曲信息*/
                let that = this
                if(cnt >= that.toplist.length)
                {
                    //console.log("toplist enough")
                    return
                }
                api.toplist_new(that, that.toplist[cnt].url, (response) => {
                    //console.log(response)
                    /* 获取所有的歌曲id */
                    let songs_id = response.body.match(/song\?id=(\d+)/g)
                    let id = []
                    for(let i = 0; i < songs_id.length; i++)
                    {
                        let song_id = songs_id[i].match(/\d+/)
                        if(song_id.length == 1)
                            id.push(song_id[0])
                    }
                    that.toplist[cnt].songs_id = id
                    that.get_detail_r(cnt, 0)
                    cnt++
                    that.get_toplist_r(cnt)
                    //console.log(id)
                })
            }
        },
        created: function () {
            var that = this
            this.get_toplist_r(0)
        }
    }
</script>
<style>
    #top-list {
        display: flex;
        flex-direction: column;
        margin-bottom: 50px;
        background-color: #ffffff;
    }
    .toplist-item {
        margin:5px;
        height: 120px;
        box-shadow: 0 0 10px #DDD;
        border-radius: 5px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        background-color: white;
    }
    .toplist-img {
        width: 120px;
        height: 120px;
    }
    .toplist-info {
        display: flex;
        flex-direction: column;
    }
    .toplist-title {
        font-size: 20px;
        margin: 5px 5px 0 5px;
    }
    .toplist-songs {
        display: flex;
        flex-direction: row;
    }
    .toplist-badge {
        display: flex;
        flex-direction: column;
    }
    .toplist-badge .mint-badge {
        margin-top: 5px;
    }
    .toplist-name div {
        margin-top: 5px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    .page-slide-enter-active {
    transition: all .3s ease;
  }

  .page-slide-leave-active {
    transition: all .3s ease-out;
  }

  .page-slide-enter, .page-slide-leave-active {
    /*margin-left: 100%;*/
    transform: translateX(100%);
  }
</style>