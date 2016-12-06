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
      this.$http.post('/api/search/get/web', {
        'csrf_token': '',
        's': '王菲',
        'type': 1,
        'offset': 0,
        'limit': 5,
        'total': true
      },
        // {
        //   method: 'post',
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //     'Referer': 'http://music.163.com/search/',
        //     'Access-Control-Allow-Origin': 'music.153.com'
        //   }
        // }
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
