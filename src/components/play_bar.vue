<template>
  <div id="play-bar">
    <mt-range v-model="play_process" :disabled = true >
      <div style="width:10%;font-size:8px" slot="start">{{play_process_start}}</div>
      <div style="width:10%;font-size:8px" slot="end">{{play_process_end}}</div>
    </mt-range>
    <audio id = 'audio' :src="music_url" @error="audioError()" autoplay="autoplay" @timeupdate ='audioUpdate()'>
    </audio>
    <div>
      <span align='center'>{{lyric_one}}</span>
    </div>
  </div>
</template>
<script>
    import {
        api
    } from '../music_api.js'
    export default {
        name: 'play-bar',
        data() {
            return {
                play_process: 0,
                play_process_start: 0,
                play_process_end: 0,
                music_url: '',
                play_process: 0,
                play_process_start: '00:00',
                play_process_end: '00:00',
                lyric_string: [],
                lyric_time: [],
                lyric_one: '',
            }
        },
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
            }
        },
        watch: {
            bar_music_id: function(val, oldval) {
                console.log(val)
                var that = this
                api.detail(this, val, (response) => {
                    //console.log(response.body.songs[0].mp3Url)
                    that.music_url = response.body.songs[0].mp3Url
                    let duration = response.body.songs[0].duration
                    let duration_int = parseInt(duration / 1000)
                        //console.log(duration_int)
                    let time_minute = parseInt(duration_int / 60)
                    let time_seconds = duration_int % 60
                        //console.log(time_minute)
                        //console.log(time_seconds)
                    let time = time_minute.toString()

                    this.play_process_end = time + ':' + time_seconds.toString()
                })
                api.lyric(this, val, (response) => {
                    //console.log(response.body)
                    let lyric = response.body.lrc.lyric
                        //this.lyric_string = lyric
                    let lyric_array = lyric.split("\n")
                        //this.lyric_string = lyric_string
                    let lyric_string = []
                        //console.log(lyric_array)
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
                    //console.log(lyric_time)
                    //console.log(lyric_string)
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
</style>