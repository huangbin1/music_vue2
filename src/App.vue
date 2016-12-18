<template>
    <div id="app">
        <mt-header fixed title="云音乐播放器"></mt-header>
        <mt-search v-model="search_song" cancel-text="取消" placeholder="搜索" class="search">
            <mt-loadmore :bottom-method="loadBottom" ref="loadmore">
                
                    <div v-for="item in search_result" class="loadmore-list" @click="chooseMusic(item)">
                        <div class="loadmore-listitem-l" :class="{playleft: item.music_play}">{{item.name}}</div>
                        <div class="loadmore-listitem-r">{{item.artists[0].name}}</div>
                    </div>
                    <!--<table class="loadmore-list">
                <tr v-for="item in search_result" class="loadmore-listitem"  @click="chooseMusic(item)">
                <td align="left" class="playdd" :class="{playleft: item.music_play}">{{item.name }}</td>
                <td align="rignt":class="{playright: item.music_play}" style="text-align:right;width:50%">{{item.artists[0].name}}</td>
                </tr>
            </table>-->
            </mt-loadmore>
        </mt-search>
        <play-bar :bar_music_id="music_id"></play-bar>
    </div>
</template>
<script>
    import {
        api
    } from './music_api.js'
    import PlayBar from './components/play_bar.vue'
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
                music_play: false
            }
        },
        methods: {
            /* 下拉刷新列表 */
            loadBottom(id) {
                var that = this
                    //console.log(api)
                api.search(this, this.search_song, this.search_limit + 12, (response) => {
                    console.log(response)
                    that.search_result = response.body.result.songs
                    that.search_limit += 12
                    that.allLoaded = true; // 若数据已全部获取完毕
                })
            },
            chooseMusic(item) {
                this.music_id = item.id
                
                for(let i=0; i < this.search_result.length; i++)
                {
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
                var that = this
                
                /* 请求搜索数据列表 */
                api.search(that, val, 12, (response) => {
                    console.log(response)
                    if (response.body.code != 200) {
                        console.log("response code != 200")
                        return
                    }
                    that.search_result = response.body.result.songs
                })
            }
        },
        components: {
            PlayBar
        }
    }
</script>
<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
    .search {
        padding-top: 40px;
    }

    /*.mint-loadmore {
        margin-top: 0;
    }
    
    .loadmore-list {
        list-style: none;
        text-align: center;
        color: #666;
        padding-bottom: 5px;
        width: 100%;
        &:last-child {
            border-bottom: solid 1px #eee;
        }
        ;
    }
    
    .loadmore-listitem {
        height: 50px;
        line-height: 50px;
        border-bottom: solid 1px #eee;
        text-align: center;
        
        &:first-child {
            border-top: solid 1px #eee;
        }
    }*/
    
    .mint-search-list{
        padding-top:100px !important;
        
    }
    .is-dropped {
        padding-top:50px !important;
    }
    .loadmore-list {
        flex: 1;
        display: flex;
        flex-direction: row;
        height: 40px;
        border-bottom: solid 1px #dddddd;
        text-align: center;
        vertical-align:middle;
        line-height:40px;
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
    
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s
    }
    
    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
</style>