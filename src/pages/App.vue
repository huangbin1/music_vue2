<template>
    <div id="app">
        <mt-header fixed title="云音乐播放器"></mt-header>
        <!--<router-link to="/home">About</router-link>-->
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <!--<router-view></router-view>-->
        <mt-tab-container class="tabbar-container" v-model="tab_selected">
            <mt-tab-container-item id="歌曲榜单">
                <top-list></top-list>
            </mt-tab-container-item>

            <mt-tab-container-item id="热门歌手">
                <mt-cell v-for="n in 5" :title="'订单 ' + n" />
            </mt-tab-container-item>

            <mt-tab-container-item id="搜索">
                <mt-search v-show="play_panel" v-model="search_song" cancel-text="取消" placeholder="搜索" class="search">
                    <mt-loadmore :bottom-method="loadBottom" ref="loadmore">
                        <transition-group name="lm-fade">
                            <div v-for="item in search_result" class="loadmore-list" @click="chooseMusic(item)" :key="item.name">
                                <div class="loadmore-listitem-l" :class="{playleft: item.music_play}">{{item.name}}</div>
                                <div class="loadmore-listitem-r">{{item.artists[0].name}}</div>
                            </div>
                        </transition-group>
                    </mt-loadmore>
                </mt-search>
                <play-bar :bar_music_id="music_id"></play-bar>
            </mt-tab-container-item>

            <mt-tab-container-item id="我的">
                <div class="page-part">
                    <mt-cell v-for="n in 12" :title="'我的 ' + n" />
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <mt-tabbar fixed v-model="tab_selected">
        <mt-tab-item id="歌曲榜单">
            <img slot="icon" src="../assets/歌曲榜单.png">
            歌曲榜单
        </mt-tab-item>
        <mt-tab-item id="热门歌手">
            <img slot="icon" src="../assets/热门歌手.png">
            热门歌手
        </mt-tab-item>
        <mt-tab-item id="搜索">
            <img slot="icon" src="../assets/搜索.png">
            搜索
        </mt-tab-item>
        <mt-tab-item id="我的">
            <img slot="icon" src="../assets/我的.png">
            我的
        </mt-tab-item>
        </mt-tabbar>
        
    </div>
</template>
<script>
    import {
        api
    } from '../music_api.js'
    import PlayBar from '../components/playbar.vue'
    import TopList from '../components/toplist.vue'
    export default {
        name: 'app',
        data() {
            return {
                /* 搜索关键词 */
                search_song: '',
                /* 一次seach请求获取多少组数据 */
                search_limit: 12,
                /* seach请求结果 */
                search_result: [],
                search_data: '',
                app_header: '云音乐播发器',
                music_id: 0,
                music_play: false,
                play_panel: true,
                tab_selected: "歌曲榜单"
                
            }
        },
        methods: {
            /* 下拉刷新列表 */
            loadBottom(id) {
                let that = this
                api.search(that, that.search_song, that.search_limit + 12, (response) => {
                    let songs = response.body.result.songs
                    /* 下拉刷新的时候需要保持正在播放歌曲的左侧标志 */
                    for (let i = 0; i < that.search_result.length; i++) {
                        if (that.search_result[i].music_play == true) {
                            songs[i].music_play = true;
                            break
                        }
                    }
                    /* 更新歌曲列表 */
                    that.search_result = songs
                    that.search_limit += 12
                    /* 数据已全部获取完毕,清除缓冲图标 */
                    that.allLoaded = true;
                })
                
            },
            chooseMusic(item) {
                this.music_id = item.id
                let that = this
                for (let i = 0; i < this.search_result.length; i++) {
                    this.search_result[i].music_play = false
                }

                /* 改变当前歌曲的样式，表示正在播放 */
                item.music_play = true
            }
        },
        watch: {
            search_song: function(val, oldVal) {
                /* 输入数据为空时不请求search数据 */
                if (val == '' || val == null) {
                    console.log('data null')
                    return
                }

                this.search_song = val
                this.search_limit = 12
                let that = this

                /* 请求搜索数据列表 */
                api.search(that, val, 12, (response) => {
                    that.search_result = response.body.result.songs
                })
                console.log(this.search_result)
            },
            tab_selected: function(val, oldVal) {
            }
        },
        components: {
            PlayBar,
            TopList
        }
    }
</script>
<style>
    #app {
        font-family: Arial, 微软雅黑, "Microsoft yahei", "Hiragino Sans GB", "冬青黑体简体中文 w3", STXihei, 华文细黑, SimSun, 宋体, Heiti, 黑体, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
    
    .tabbar-container {
        padding-top: 40px;
    }
    
    .mint-search-list {
        padding-top: 100px !important;
    }
    
    .is-dropped {
        padding-top: 50px !important;
    }
    
    .loadmore-list {
        flex: 1;
        display: flex;
        flex-direction: row;
        height: 40px;
        border-bottom: solid 1px #dddddd;
        text-align: center;
        vertical-align: middle;
        line-height: 40px;
    }
    
    .loadmore-listitem-l {
        margin-left: 4px;
        flex: 1;
    }
    
    .loadmore-listitem-r {
        text-align: right;
        flex: 1;
    }
    
    .playleft {
        margin-left: 0;
        border-left: solid 4px #55acec;
    }
    
    .playright {
        margin-left: -1px;
        border-top: solid 1px #dddddd;
        border-bottom: solid 1px #dddddd;
    }
    
    .lm-fade-enter-active {
        transition: all .3s ease;
    }
    
    .lm-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    
    .lm-fade-enter,
    .lm-fade-leave {
        transform: translateX(10px);
        opacity: 0;
    }
</style>