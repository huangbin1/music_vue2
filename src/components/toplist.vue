<template>
  <div id="top-list">
    <transition name="routerfade">
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view v-show="get_in_router.status"></router-view>
    </transition>
    <div v-show="!get_in_router.status">
        <div class="toplist-item"  v-for="(item, index) in toplist" @click="show_toplist(index)">
            <img class="toplist-img" :src="item.imgUrl" ></img>
            <div class="toplist-info">
                <div class="toplist-title">{{item.name}}</div>
                <div class="toplist-songs">
                    <div class="toplist-badge">
                        <mt-badge size="small" color="red">1</mt-badge>
                        <mt-badge size="small" color="#f9654f">2</mt-badge>
                        <mt-badge size="small" color="#efa79c">3</mt-badge>
                    </div>
                    <div class="toplist-name" v-if="item.songs.length >= 3">
                        <div>{{item.songs[0].name}}</div>
                        <div>{{item.songs[1].name}}</div>
                        <div>{{item.songs[2].name}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>

</template>
<script>
    import {
        api
    } from '../music_api.js'
    import TopListPage from './toplistpage.vue'
    export default {
        name: 'top-list',
        components: {
            TopListPage
        },
        data() {
            return {
                get_in_router: {
                    status: false
                },
                music_id: 0,
                toplist: api.toplist,
                toplist_list_id: [],
                toplist_load_ok: false
            }
        },
        methods: {
            show_toplist: function(idx) {
                console.log(this.$router)
                console.log("进入路由")
                this.get_in_router.status = true
                this.$router.push({
                    name: 'toplistpage',
                    params: {
                        id: idx,
                        toplist: this.toplist[idx],
                        get_in_router: this.get_in_router
                    }
                })
            },
            get_detail_r: function(pos, cnt) {
                var that = this
                if (cnt <= 0) {
                    //console.log("detail enough")
                    if (pos >= that.toplist.length - 1) {
                        this.toplist_load_ok = true
                        console.log(that.toplist)
                    }
                    return
                }
                api.detail(that, that.toplist[pos].songs_id[3 - cnt], (response) => {
                    that.toplist[pos].songs.push(response.body.songs[0])
                    cnt--
                    that.get_detail_r(pos, cnt)
                })
            },
            get_toplist_r: function(cnt) {
                /* 获取音乐榜的音乐id 以及前3首歌曲信息*/
                let that = this
                if (cnt >= that.toplist.length) {
                    //console.log("toplist enough")
                    return
                }
                api.toplist_new(that, that.toplist[cnt].url, (response) => {
                    //console.log(response)
                    /* 获取所有的歌曲id */
                    let songs_id = response.body.match(/song\?id=(\d+)/g)
                    let id = []
                    for (let i = 0; i < songs_id.length; i++) {
                        let song_id = songs_id[i].match(/\d+/)
                        if (song_id.length == 1)
                            id.push(song_id[0])
                    }
                    that.toplist[cnt].songs_id = id
                    that.get_detail_r(cnt, 3)
                    cnt++
                    that.get_toplist_r(cnt)
                        //console.log(id)
                })
            }
        },
        watch: {
            music_id: function(val, Oldval) {
                console.log("toplist watch" + val + " " + Oldval)
                console.log(this.$root)
                this.$emit('playMusic', this.music_id)
            }
        },
        created: function() {
            console.log("toplist created")
            if (this.toplist_load_ok == false)
                this.get_toplist_r(0)
        }
    }
</script>
<style>
    #top-list {
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
    }
    
    .toplist-item {
        margin: 5px;
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
        margin-left: 5px;
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
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    .page-slide-enter-active {
        transition: all .3s ease;
    }
    
    .page-slide-leave-active {
        transition: all .3s ease-out;
    }
    
    .page-slide-enter,
    .page-slide-leave-active {
        /*margin-left: 100%;*/
        transform: translateX(100%);
    }
</style>