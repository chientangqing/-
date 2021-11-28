<template>
  <!-- 底部左边播放信息模块 -->
  <div class="leftcontent">
     
      <!-- 歌曲图片 -->
          <div class="songimg" v-if="!imgClick" @click="showSong(song)">
            <div></div>
            <img v-lazy="song.img" :alt="song.songname" >
            <i class="el-icon-arrow-up"></i>
          </div>
          <div class="song-close" v-else>
                 <i class="el-icon-arrow-down" @click="showSong(song)"></i>
          </div>

          <div class="songdetail" v-if="!imgClick">
              <!-- 歌名 -->
                <li class="songname" @click="showSong(song)">{{song.songname}}</li>
                <!-- 歌手 -->
                <div class="artists">
                <li  v-for="(item,index) in song.artists" :key="index" class="song-artist">
                    <span @click.stop="clicksonger(item.id)">{{item.name}}</span>
                    <span v-if="index!==song.artists.length-1">/</span>
                </li>
               </div>
          </div> 
          <div v-else>
              <ul class="song-icon">
                <li v-for="(item,index) in iconList" :key="index">
                  <i :class="item"></i>
                </li>
              </ul>
          </div>
        </div>
</template>

<script>

export default {
    name:'LeftContent',
    props:{
        songs:{
            tpye:Object,
            default:{}
        }
    },
    data(){
      return{
        song:this.songs,
        imgClick:false,
        iconList:[
          'el-icon-star-off',
          'el-icon-folder-add',
          'el-icon-bottom',
          'el-icon-cloudy'

        ]
      }
    },
    methods:{
        //点击歌手跳到详情页
        clicksonger(id){
            this.$emit('clicksonger',id)
        },
        // 歌曲播放页面
        showSong(song){
          this.imgClick=!this.imgClick;
          let content={
            click:this.imgClick,
            song:song
          }
          // console.log(this.imgClick);
          this.$bus.$emit('openSong',content)
          
        }
    },
    watch:{
      songs:{
       
        handler(value){
           
           this.song=value;
           this.$bus.$emit('openSong',{click:this.imgClick,song:value})
        }
      }
    },
    mounted(){

         this.$bus.$on('closesong',()=>{
           this.song={}
        })
          this.$bus.$on('closewindow',click=>{
            this.imgClick=click;
           })
    },
  
}
</script>

<style  scoped>
.leftcontent{
  width:350px;
  height: 60px;
 display: flex;
 align-items: center;
 margin-left: 10px;
}
/* 歌曲封面处理 */
.songimg{
  width: 50px;
  height: 50px;
  border-radius: 5px;
  position: relative;
}
.songimg i{
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: #ffffff;
  cursor: pointer;
}
.songimg div{
  width: 50px;
  height: 50px;
  border-radius:5px;
  background-color: rgba(0,0,0, .4);
  position: absolute;
  display: none;
  cursor: pointer;
}
.songimg:hover *{
  display: block;
}



/* 歌曲详情处理 */
.songdetail{
  width: 350px;

  height: 50px;
  overflow: hidden;
  margin-left: 10px;
  line-height: 26px;
  
}
.artists{
  font-size: 12px;
  font-weight: 200;
  margin-top:-3px;
  cursor: pointer;
  display: flex;
 
}
.songname{
  font-size: 15px;
  font-weight: 300;
  cursor: pointer;
  height: 25px;
  overflow: hidden;
 
}
.songimg img{
  width: 50px;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;
 
}


/* 按钮操作 */
.song-icon{
  display: flex;

  width: 250px;
  height: 50px;
  
  align-items: center;
  

}
.song-icon li{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #e6e6e6;
  line-height: 40px;
  text-align: center;
  margin-left: 10px;
  font-size: 18px;
}
.song-icon li:hover{
  background-color: #f5f5f5;
  
}

/* 关闭页面 */
.song-close{
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;

}
.song-close i{
  cursor: pointer;
}

</style>

