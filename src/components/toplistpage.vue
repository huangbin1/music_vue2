<template>
  <div id="toplistpage">
    <mt-header :title="toplist_item.name" fixed>
        <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <!--<router-link class="page-back" :to="'/'">
        <div class="mintui mintui-back">返回</div>
        <div class="mintui mintui-back">{{toplist_item.name}}</div>
    </router-link>-->
    <mt-loadmore :auto-fill="false" :bottom-method="TopListLoadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <transition-group name="lm-fade">
            <div v-for="item in toplist_item.songs" class="loadmore-list" @click="ChooseMusic(item)" :key="item.name">
                <div class="loadmore-listitem-l" :class="{playleft: item.music_play}">{{item.name}}</div>
                <div class="loadmore-listitem-r">{{item.artists[0].name}}</div>
            </div>
        </transition-group>
    </mt-loadmore>
  </div>
</template>

<script>
    import {
        api
    } from '../music_api.js'
    import PlayBar from './playbar.vue'
    export default {
        name: 'toplistpage',
        components: {
            PlayBar
        },
        /* 进入路由 钩子函数 */
        beforeRouteEnter: function(to, from, next) {
            console.log("进入路由 钩子函数")
            next(vm => {
                console.log(vm)
                console.log(vm.$route.params)
                vm.toplist_item = vm.$route.params.toplist
                console.log(vm.toplist_item)
                vm.get_in_router = vm.$route.params.get_in_router
                if (vm.toplist_item.songs.length <= 3)
                    vm.loadmore_detail_r(9)
            })
        },
        beforeRouteLeave: function(to, from, next) {
            console.log("退出路由 钩子函数")
                /* 不显示路由 */
            this.get_in_router.status = false

        },
        data() {
            return {
                toplist_item: null,
                loadmore_cnt: 3,
                menuedIndex: 0,
                get_in_router: null,
                music_id: '',
                allLoaded: false
            }
        },
        methods: {
            // BackToApp: function() {
            //     console.log("路由返回")
            //     this.$router.go(-1)
            // },
            TopListLoadBottom(id) {
                console.log("TopListLoadBottom" + id)
                this.loadmore_detail_r(12)

            },
            loadmore_detail_r: function(cnt) {
                var that = this
                if (cnt == 0) {
                    console.log("detail enough")
                        //this.allLoaded = true; // 若数据已全部获取完毕
                    this.$refs.loadmore.onTopLoaded()
                    this.$refs.loadmore.onBottomLoaded()
                    return
                }
                console.log(that.loadmore_cnt)
                api.detail(that, that.toplist_item.songs_id[that.loadmore_cnt], (response) => {
                    console.log(response.body.songs[0])
                    that.loadmore_cnt++;
                    that.toplist_item.songs.push(response.body.songs[0])
                    cnt--;
                    that.loadmore_detail_r(cnt)
                })
            },
            ChooseMusic(item) {
                this.music_id = item.id
                console.log("发送广播" + this.music_id)
                console.log(this.$parent)
                this.$parent.$data.music_id = this.music_id
                let that = this
                for (let i = 0; i < this.toplist_item.songs.length; i++) {
                    this.toplist_item.songs[i].music_play = false
                }

                /* 改变当前歌曲的样式，表示正在播放 */
                item.music_play = true
            }
        },

        created: function() {
            this.toplist_item = this.$route.params.toplist
            console.log(this.toplist_item)
            this.get_in_router = this.$route.params.get_in_router
            this.loadmore_detail_r(9)
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @media (-webkit-min-device-pixel-ratio: 1.5),
    (min-device-pixel-ratio: 1.5) {
        .border-1px:after,
        .border-1px:before {
            -webkit-transform: scaleY(.7);
            -webkit-transform-origin: 0 0;
            transform: scaleY(.7);
        }
        .border-1px:after {
            -webkit-transform-origin: left bottom;
        }
    }
    
    @media (-webkit-min-device-pixel-ratio: 2),
    (min-device-pixel-ratio: 2) {
        .border-1px:after,
        .border-1px:before {
            -webkit-transform: scaleY(.5);
            transform: scaleY(.5);
        }
    }
    
    #toplistpage {
        width: 100%;
        background: #fff;
        padding-bottom: 75px;
    }
    
    .loadmore-list {
        flex: 1;
        display: flex;
        flex-direction: row;
        height: 40px;
        border-bottom: solid 1px #dddddd;
        text-align: left;
        vertical-align: middle;
        line-height: 40px;
    }
    
    .loadmore-listitem-l {
        margin-left: 4px;
        flex: 1;
    }
    
    .loadmore-listitem-r {
        text-align: right;
        flex: 1;
    }
    
    .playleft {
        margin-left: 0;
        border-left: solid 4px #55acec;
    }
    
    .lm-fade-enter-active {
        transition: all .3s ease;
    }
    
    .lm-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    
    .lm-fade-enter,
    .lm-fade-leave {
        transform: translateX(10px);
        opacity: 0;
    }
</style>