import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/recommend'
    },
    {
      path: '/home',
      name: 'home',
      component: ()=>import('@/pages/Home.vue'),

    },


    // 歌单详情页
    {
      path:'/menuDetail/:id',
      component:()=>import('@/pages/MenuDetail.vue'),
      redirect:'/menuDetail/:id/list',
      children:[
        {
          path:'list',
          component:()=>import('@/components/common/menu/MenuSong.vue'),
        },
        {
          path:'comment',
          component:()=>import('@/components/common/menu/Comment.vue'),
        },
        {
          path:'subscribe',
          component:()=>import('@/components/common/menu/Subscribe.vue'),
        }
      ]
    },

  // 用户详情页
    {
      path:'/user/:id',
      component:()=>import('@/pages/User.vue'),
    },

    // 歌手详情页
    {
      path:'/songerDetail',
      name:'songerDetail',
      component:()=>import('@/pages/SongerDetail.vue'),
      redirect:'/songerDetail/album/:id',
      children:[
        {
          path:'like/:id',
          component: ()=>import('@/pages/songerChild/SongerLike.vue')
        },
        {
          path:'album/:id',
          component: ()=>import('@/pages/songerChild/SongerAlbum.vue')
        },
        {
          path:'mv/:id',
          component: ()=>import('@/pages/songerChild/Mv.vue')
        },
        {
          path:'detail/:id',
          component: ()=>import('@/pages/songerChild/Detail.vue')
        }
      ]
    },


    // 搜索路由
    {
      path:'/search',
      name:'search',
      component: ()=>import('@/pages/Search.vue'),
      children:[
        {
          path:'song',
          component:()=>import('@/pages/searchChild/Song.vue')
        },
        {
          path:'album',
          component:()=>import('@/pages/searchChild/Album.vue')
        },
        {
          path:'menu',
          component:()=>import('@/pages/searchChild/Menu.vue')
        },
        {
          path:'songer',
          component:()=>import('@/pages/searchChild/Songer.vue')
        },
        {
          path:'boarder',
          component:()=>import('@/pages/searchChild/Boarder.vue')
        },
        {
          path:'user',
          component:()=>import('@/pages/searchChild/User.vue')
        },
        {
          path:'lyric',
          component:()=>import('@/pages/searchChild/Lyric.vue')
        },
        {
          path:'video',
          component:()=>import('@/pages/searchChild/Video.vue')
        }
      ]
    },

    // 发现音乐
    {
      path:'/',
      name:'found',
      component: ()=>import('@/pages/Founds.vue'),
      children:[
        // 个性推荐
        {
          path:'/recommend',
          name:'recommend',
          component: ()=>import('@/pages/children/Recommend.vue')
        },

        // 专属订制
        {
          path:'/tomake',
          name:'tomake',
          component: ()=>import('@/pages/children/Tomake.vue')
        },

        // 歌单
        {
          path:'/songmenu',
          name:'songmenu',
          component:()=>import('@/pages/children/Songmenu.vue')
        },

        // 精品歌单
        {
          path:'/goodmenu',
          name:'goodmenu',
          component:()=>import('@/pages/children/GoodMenu.vue')
        },

        // 排行榜
        {
          path:'/top',
          name:'top',
          component:()=>import('@/pages/children/Top.vue')
        },

        // 歌手
        {
          path:'/songer',
          name:'songer',
          component: ()=>import('@/pages/children/Songer.vue')
        },

        // 最新音乐
        {
          path:'/new',
          name:'new',
          component: ()=>import('@/pages/children/New.vue')
        },
      ]
    }
  ]
})
