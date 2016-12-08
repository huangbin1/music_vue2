<template>
  <div id="app">
    <mt-header fixed title="云音乐播放器"></mt-header>
    <mt-search v-model="value" cancel-text="取消" placeholder="搜索" :result.sync="result">
      <mt-cell v-for="item in result"
                :title="item.name"
                :value='item.album.name' is-link to="&">
      </mt-cell>
    </mt-search>
    <div>
    
    </div>
  </div>
</template>
<script>
    var qs = require('querystring')

    export default {
        name: 'app',
        data() {
            return {
                msg: '云音乐播放器',
                header: '云音乐播发器',
                value: '',
                result: ''
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
        text-align: center;
        color: #2c3e50;
        margin-top: 50px;
    }
    
    .mint-search-list {
        margin-top: 60px;
        text-align: left;
    }
</style>