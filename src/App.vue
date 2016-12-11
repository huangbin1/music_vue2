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
        
        <mt-range v-model="play_process" :disabled = true >
            <div style="width:10%;font-size:8px" slot="start">{{play_process_start}}</div>
            <div style="width:10%;font-size:8px" slot="end">{{play_process_end}}</div>
        </mt-range>
        <audio id = 'audio' :src="music_url" autoplay="autoplay" @timeupdate ='music_update()'>
        </audio>
        <div>
            <span align='center'>{{lyric_one}}</span>
        </div>
    </div>
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
                music_url: '',
                lyric_one: '',
                lyric_string: [],
                lyric_time: []
            }
        },
        methods: {
            music_update() {
                let audio =document.getElementById("audio")
                for(let i = 1; i < this.lyric_time.length; i++)
                {
                    if(audio.currentTime > this.lyric_time[i-1] && audio.currentTime <= this.lyric_time[i])
                        this.lyric_one = this.lyric_string[i-1]
                }

                let currentTime_int = parseInt(audio.currentTime)
                //console.log(currentTime_int)
                let time_minute = parseInt(currentTime_int/60)
                let time_seconds = currentTime_int%60
                //console.log(time_minute)
                //console.log(time_seconds)
                let time = time_minute.toString()

                this.play_process_start = time + ':' + time_seconds.toString()
                let play_process = audio.currentTime/audio.duration
                //console.log(play_process)
                this.play_process = parseInt(play_process*100)
            },
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
                    let duration = response.body.songs[0].duration
                    let duration_int = parseInt(duration/1000)
                    console.log(duration_int)
                    let time_minute = parseInt(duration_int/60)
                    let time_seconds = duration_int%60
                    console.log(time_minute)
                    console.log(time_seconds)
                    let time = time_minute.toString()

                    this.play_process_end = time + ':' + time_seconds.toString()
                })
                api.lyric(this, item.id, (response) => {
                    //console.log(response.body.lrc.lyric)
                    let lyric = response.body.lrc.lyric
                    //this.lyric_string = lyric
                    let lyric_array = lyric.split("\n")
                    //this.lyric_string = lyric_string
                    console.log(lyric_array)
                    let pattern = /\[\d{2}:\d{2}\.\d{2,3}\]/g
                    let lyric_time = []
                    for(let i = 0; i < lyric_array.length; i++)
                    {
                        let lyric_line = lyric_array[i]
                        this.lyric_string.push(lyric_line.split(']')[1])
                        let line = lyric_line.match(pattern)
                        if(line == null) break
                        console.log(line[0])
                        lyric_line = line[0].slice(1,-1)
                        let time_arr = lyric_line.split(":")
                        let time =parseInt(time_arr[0])*60 + parseFloat(time_arr[1]);
                        lyric_time.push(time)
                    }
                    console.log(lyric_time)
                    console.log(this.lyric_string)
                    this.lyric_time = lyric_time
                })
            },
            play(music) {
                console.log(music);
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
            },
            music_duration: function(val, oldVal) {
                console.log('new: %s, old: %s', val, oldVal)
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
        height: 80px;
        background: -webkit-linear-gradient(top, #ffffff, #26a2ff);
    }
    
    .mt-range {
        margin-top: 0;
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