<template>
  <div id="app">
    <mt-search v-model="value" cancel-text="取消" placeholder="搜索">
        <mt-loadmore :bottom-method="loadBottom" ref="loadmore">
            <table class="loadmore-list">
                <tr v-for="item in result" class="loadmore-listitem">
                <td align="left" style="font-size:20px;">{{item.name }}</td>
                <td align="rignt" style="text-align:right;">{{item.album.name}}</td>
                </tr>
            </table>
        </mt-loadmore>
    </mt-search>
    
    <div id="play-bar">
        <mt-range v-model="play_process">
            <div style="width:10%;font-size:8px" slot="start">{{play_process_start}}</div>
            <div style="width:10%;font-size:8px" slot="end">{{play_process_end}}</div>
        </mt-range>
        <audio id='music' src="http://ws.stream.qqmusic.qq.com/107192078.m4a?fromtag=46" autoplay="autoplay">
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
    var qs = require('querystring')
    import {
        MessageBox
    } from 'mint-ui';
    export default {
        name: 'app',
        data() {
            return {
                msg: '云音乐播放器',
                header: '云音乐播发器',
                value: '',
                result: '',
                expand_flag: '+',
                play_process: 0,
                play_process_start: '00:00',
                play_process_end: '00:00'
            }
        },
        methods: {
            loadTop(id) {
                this.$refs.loadmore.onTopLoaded(id);
            },
            loadBottom(id) {
                this.allLoaded = true; // 若数据已全部获取完毕
                this.$refs.loadmore.onBottomLoaded(id);
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
                var data = {
                    's': val,
                    'csrf_token': '',
                    'type': 1,
                    'offset': 0,
                    'limit': 10,
                    'total': true
                }
                var that = this
                this.$http.post('/api/search/get/web', qs.stringify(data)).then((response) => {
                    // 响应成功回调
                    console.log(response.body)
                    if (response.body.code == 200)
                        that.result = response.body.result.songs
                }, (response) => {
                    console.log('error response')
                        // 响应错误回调
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
    
    .loadmore-list {
        list-style: none;
        text-align: center;
        color: #666;
        padding-bottom: 5px;
        &:last-of-type {
            border-bottom: solid 1px #eee;
        }
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