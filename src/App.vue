<template>
  <div id="app">
    <h2>{{ msg }}</h2>
    <mt-search v-model="value"
               cancel-text="取消"
               placeholder="搜索"
               :result.sync="result">
    </mt-search>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: '云音乐播放器',
      value:''
    }
  },
  methods: {
    startHacking () {
      this.$toast('It Works!')
    }
  },
  watch: {
   value: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
      //Lambda写法
	    this.$http.post('http://music.163.com/api/search/pc',{
          's': '周杰伦',
          'offset': 0,
          'limit': 20,
          'type': 1
        },
        {
          credentials: true
        }
      ).then((response) => {
          // 响应成功回调
          console.log(response)
        }, (response) => {
            console.log("error response")
            // 响应错误回调
      })
      // this.$http({
      //   method:'POST',
      //   url:'http://music.163.com/api/search/pc',
      //   data:{
      //     's': '周杰伦',
      //     'offset': '0',
      //     'limit': '20',
      //     'type': ' '
      //   },
      //   headers: {
      //     "X-Requested-With": "XMLHttpRequest",
      //     'Access-Control-Allow-Origin': "http://music.163.com/"
      //   },
      //   emulateJSON: true
      //   }).then((response) => {
      //     console.log(response)
      //   })
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
  margin-top: 20px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
