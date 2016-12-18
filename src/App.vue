<template>
  <div id="app">
    <mt-search v-model="search_data" cancel-text="取消" placeholder="搜索">
        <mt-loadmore :bottom-method="loadBottom" ref="loadmore">
            <table class="loadmore-list">
                <tr v-for="item in search_result" class="loadmore-listitem"  @click="chooseMusic(item)">
                <td align="left" :class="{playleft: item.music_play}" style="font-size:20px;width:50%">{{item.name }}</td>
                <td align="rignt":class="{playright: item.music_play}" style="text-align:right;width:50%;margin-left:-1px">{{item.artists[0].name}}</td>
                </tr>
            </table>
        </mt-loadmore>
    </mt-search>
    <play-bar :bar_music_id="music_id"></play-bar>
  </div>
</template>
<script>
    import {
        api
    } from './music_api.js'
    import {
        MessageBox
    } from 'mint-ui';
    import PlayBar from './components/play_bar.vue'
    export default {
        name: 'app',
        data() {
            return {
                search_song: '',
                search_limit: 12,
                search_result: [],
                search_data: '',
                app_header: '云音乐播发器',
                music_id: 0,
                music_play: false
            }
        },
        methods: {
            loadBottom(id) {
                var that = this
                    //console.log(api)
                api.search(this, this.search_song, this.search_limit + 12, (response) => {
                    console.log(response)
                    that.search_result = response.body.result.songs
                    that.search_limit += 12
                    that.allLoaded = true; // 若数据已全部获取完毕
                    //that.$refs.loadmore.onBottomLoaded(id);
                })

            },
            chooseMusic(item) {
                this.music_id = item.id
                
                for(let i=0; i < this.search_result.length; i++)
                {
                    this.search_result[i].music_play = false
                }

                item.music_play = true
                //console.log(item)
            }
        },
        watch: {
            search_data: function(val, oldVal) {
                console.log('new: %s, old: %s', val, oldVal)
                if (val == '' || val == null) {
                    console.log('data null')
                    return
                }

                this.search_song = val
                this.search_limit = 12
                var that = this
                    //console.log(api)
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
    
    .mint-main-button {
        color: #000;
    }
    
    .mint-loadmore {
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
    }
    .playleft {
        margin-left: -2px;
        border-left: solid 4px #55acec;
        border-top: solid 1px #dddddd;
        border-bottom: solid 1px #dddddd;
        }
    .playright {
        margin-left: -1px;
        border-top: solid 1px #dddddd;
        border-bottom: solid 1px #dddddd;
        }
</style>