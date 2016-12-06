<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h2>{{ msg }}</h2>
    <mt-search v-model="value"
               cancel-text="取消"
               placeholder="搜索">
  </div>
</template>
<script>
// var qs = require('querystring')
export default {
  name: 'app',
  data () {
    return {
      msg: '云音乐播放器',
      value: ''
    }
  },
  watch: {
    value: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
      this.$http.post('/api/search/suggest/web', {
        's': 'west',
        'type': 1,
        'offset': 0,
        'limit': 10,
        'total': true
      },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        ).then((response) => {
          // 响应成功回调
          console.log(response)
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
  margin-top: 60px;
}
</style>
