<template>
  <div id="app">
    <mt-search v-model="value" cancel-text="取消" placeholder="搜索">
        <mt-loadmore :bottom-method="loadBottom" ref="loadmore">
            <table class="loadmore-list">
                <tr v-for="item in result" class="loadmore-listitem" @click="choose_music(item)">
                <td align="left" style="font-size:20px;width:50%">{{item.name }}</td>
                <td align="rignt" style="text-align:right;width:50%">{{item.album.name}}</td>
                </tr>
            </table>
        </mt-loadmore>
    </mt-search>
    
    <div id="play-bar">
        <mt-range v-model="play_process">
            <div style="width:10%;font-size:8px" slot="start">{{play_process_start}}</div>
            <div style="width:10%;font-size:8px" slot="end">{{play_process_end}}</div>
        </mt-range>
        <audio :src="music_url" autoplay="autoplay">
        </audio>
    </div>
    <mt-palette-button :content="expand_flag" @expand="action_expand()" @collapse="action_collapse()"
      direction="lt" class="pb" :radius="60" ref="target" mainButtonStyle="color:#fff;background-color:#26a2ff;"
      style="right:30px;position: absolute">
      <div class="my-icon-button icon-left" @touchstart="action_touch_left()"></div>
      <div class="my-icon-button icon-pause" @touchstart="action_touch_pause()"></div>
      <div class="my-icon-button icon-right" @touchstart="action_touch_right()"></div>
    </mt-palette-button>
    
  </div>
</template>
<script>
    import { api } from './music_api.js'
    import { MessageBox } from 'mint-ui';
    export default {
        name: 'app',
        data() {
            return {
                msg: '云音乐播放器',
                search_song: '',
                search_limit: 12,
                header: '云音乐播发器',
                value: '',
                result: [],
                expand_flag: '+',
                play_process: 0,
                play_process_start: '00:00',
                play_process_end: '00:00',
                music_url: ''
            }
        },
        methods: {
            loadTop(id) {
                this.$refs.loadmore.onTopLoaded(id);
            },
            loadBottom(id) {
                var that = this
                //console.log(api)
                api.search(this, this.search_song, this.search_limit + 12, (response) => {
                    console.log(response)
                    console.log(that.result)
                    that.result = response.body.result.songs
                    console.log(that.result)
                    that.search_limit += 12
                    that.allLoaded = true; // 若数据已全部获取完毕
                    //that.$refs.loadmore.onBottomLoaded(id);
                })
                
            },
            choose_music(item) {
                console.log(item)
                var that = this
                api.detail(this, item.id, (response) => {
                    console.log(response.body.songs[0].mp3Url)
                    that.music_url = response.body.songs[0].mp3Url
                })
            },
            play(music) {
                console.log(music);
            },
            action_expand() {
                this.expand_flag = 'x';
            },
            action_collapse() {
                this.expand_flag = '+';
            },
            action_touch_left() {
                this.$refs.target.collapse();
                this.expand_flag = '+';
            },
            action_touch_pause() {
                this.$refs.target.collapse();
                this.expand_flag = '+';
            },
            action_touch_right() {
                this.$refs.target.collapse();
                this.expand_flag = '+';
            }
        },
        watch: {
            value: function(val, oldVal) {
                console.log('new: %s, old: %s', val, oldVal)
                if (val == '' || val == null) {
                    console.log('data null')
                    return;
                }
                this.search_song = val
                this.search_limit = 12
                var that = this
                //console.log(api)
                api.search(that, val, 12, (response) => {
                    console.log(response)
                    
                    that.result = response.body.result.songs
                })
            }
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
        };
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
    
    #play-bar {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 50px;
        background: -webkit-linear-gradient(top, #ffffff, #26a2ff);
    }
    
    .mt-range {
        margin-top: -15px;
    }
    
    .mt-range-progress {
        background-color: #ffc107;
    }
    
    .mint-palette-button {
        position: absolute;
    }
    
    .pb {
        width: 80px;
        height: 80px;
        line-height: 60px;
        color: #FFF;
        position: absolute;
        bottom: 60px;
        opacity: 0.7;
    }
    
    .my-icon-button {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        color: #fff;
        line-height: 20px;
        text-align: center;
    }
    
    .icon-left {
        background: url(./style/icons/icon-left.png) no-repeat center center;
        background-color: #26a2ff;
    }
    
    .icon-pause {
        background: url(./style/icons/icon-pause.png) no-repeat center center;
        background-color: #26a2ff;
    }
    
    .icon-right {
        background: url(./style/icons/icon-right.png) no-repeat center center;
        background-color: #26a2ff;
    }
</style>