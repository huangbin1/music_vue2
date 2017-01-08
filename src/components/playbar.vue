<template>
  <div id="play-bar">
    <mt-range v-model="play_process" :disabled = true >
      <div style="width:10%;font-size:8px" slot="start">{{play_process_start}}</div>
      <div style="width:10%;font-size:8px" slot="end">{{play_process_end}}</div>
    </mt-range>
    <audio id = 'audio' :src="music_url" @error="audioError()" autoplay="autoplay" @timeupdate ='audioUpdate()'>
    </audio>
    <div style="width:100%;text-align: center"  @click="enterPlayPanel()">
      <span>{{lyric_one}}</span>
    </div>
  </div>
</template>
<script>
    import {api} from '../music_api.js'
    export default {
        name: 'play-bar',
        data() {
            return {
                /* 进度条进度 */
                play_process: 0,
                /* 进度条左侧：已经播放时间 */
                play_process_start: '00:00',
                /* 进度条右侧：音乐总时长 */
                play_process_end: '00:00',
                /* 歌曲url */
                music_url: '',
                /* 每一行歌词 数组 */
                lyric_string: [],
                /* 每一行歌词的时间 数组 */
                lyric_time: [],
                /* 当前显示的歌词 */
                lyric_one: '',
            }
        },

        /* 从父组件获取音乐id */
        props: ["bar_music_id"],
        methods: {
            audioUpdate() {
                let audio = document.getElementById("audio")
                    /* 实时显示歌词 */
                if (audio.currentTime < this.lyric_time[0])
                    this.lyric_one = this.lyric_string[0]
                for (let i = 1; i < this.lyric_time.length; i++) {
                    if (audio.currentTime > this.lyric_time[i - 1] && audio.currentTime <= this.lyric_time[i])
                        this.lyric_one = this.lyric_string[i - 1]
                }

                /* 实时显示当前播放时间 */
                let currentTime_int = parseInt(audio.currentTime)
                let time_minute = parseInt(currentTime_int / 60)
                let time_seconds = currentTime_int % 60
                this.play_process_start = time_minute.toString() + ':' + time_seconds.toString()

                /* 实时显示进度条 */
                let play_process = audio.currentTime / audio.duration
                this.play_process = parseInt(play_process * 100)
            },
            audioError(err) {
                console.log("无法播放音乐")
                this.lyric_one = '无法播放音乐'
            },
            enterPlayPanel() {
                console.log("fdsafd")
                this.play_panel = false
            }
        },
        watch: {
            bar_music_id: function(val, oldval) {
                console.log(val)
                    /* 滚动条和歌词清0 */
                this.play_process = 0
                this.lyric_one = ''
                var that = this

                /* 获取歌曲url */
                api.detail(this, val, (response) => {
                    that.music_url = response.body.songs[0].mp3Url

                    /* 获取歌曲时长并显示到滚动条右边 */
                    let duration = response.body.songs[0].duration
                    let duration_int = parseInt(duration / 1000)
                    let time_minute = parseInt(duration_int / 60)
                    let time_seconds = duration_int % 60
                    let time = time_minute.toString()
                    this.play_process_end = time + ':' + time_seconds.toString()
                })

                /* 获取歌词 */
                api.lyric(this, val, (response) => {
                    let lyric = response.body.lrc.lyric
                    let lyric_array = lyric.split("\n")
                    let lyric_string = []

                    /* 根据正则表达式获取歌词时间数组 */
                    let pattern = /\[\d{2}:\d{2}\.\d{2,3}\]/g
                    let lyric_time = []
                    for (let i = 0; i < lyric_array.length; i++) {
                        let lyric_line = lyric_array[i]
                        lyric_string.push(lyric_line.split(']')[1])
                        let line = lyric_line.match(pattern)
                        if (line == null) break
                            //console.log(line[0])
                        lyric_line = line[0].slice(1, -1)
                        let time_arr = lyric_line.split(":")
                        let time = parseInt(time_arr[0]) * 60 + parseFloat(time_arr[1]);
                        lyric_time.push(time)
                    }
                    this.lyric_time = lyric_time
                    this.lyric_string = lyric_string
                })
            }
        }
    }
</script>
<style>
    #play-bar {
        position: fixed;
        bottom: 50px;
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
</style>