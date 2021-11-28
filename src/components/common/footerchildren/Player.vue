<template>
  <div class="Player">
    
       <div class="allplay">
          <div class="player">
              <div class="playbutton">
              <div class="pre">
                <i class="iconfont icon-fangxiang-xiangzuo" @click="presong" ></i>
              </div>
              <div class="playbtn" @click="playsong" >
                <i class="iconfont icon-bofang" v-if="!toplay"></i>
                <i class="iconfont  icon-zanting" v-else></i>
              </div>
              <div class="next"  >
                <i class="iconfont icon-fangxiang-xiangyou" @click="nextsong"></i>
              </div>
              </div>
            
          </div>
          <audio ref="audio" @ended="nextsong" @error="errorsong" @canplay="ready" :src="`https://music.163.com/song/media/outer/url?id=${currentId}.mp3`">
          </audio>
        </div>
        <div class="time">
            <div class="starttime">
              <span v-if="currentTime>=0">{{currentTime |filterTime}}</span>
              <span v-else></span>
            </div>
            <div class="progress">
              <div class="colorprogress" ref='colPro'>
                <li class="dot"></li>
              </div>
            </div>
            <div class="alltime">
              <span v-if="song.playtime">{{song.playtime |filterTime}}</span>
              <span v-else></span>
            </div>
        </div>
     
  </div>
</template>

<script>
export default {
    name:'Player',
    props:{
         currentUrl:{
                type:Number
         },
          playing:{
              type:Boolean,
              default:false
          },
          playingIndex:{
              tpye:Number,
              default:-1
          },
          playlist:{
              tpye:Array
          },
          newsong:{
            type:Object
          },
          volumns:{
              tpye:Number
          }

    },
    mounted(){
      this.$bus.$on('closesong',()=>{
          this.pause();
          this.$refs.audio.src='';
          this.toplay=false;
          this.currentTime=-1;
          this.song={};
          this.currentIndex=-1;
          this.$refs.colPro.style.width="0";
      })
    }
    ,
    data(){
            return {
                //是否播放
                 toplay:this.playing,
                 //当前Id
                 currentId:this.currentUrl,
                 //当前的索引
                currentIndex:this.playingIndex,
                //播放列表
                songlist:this.playlist,
                //歌曲信息
                song:this.newsong,
                currentTime:-1,
                timer:0,
                volumn:this.volumns,
                songready:false
                
            }
    },
    watch:{
       currentUrl(newvalue){
         this.currentId=newvalue;
         this.$nextTick(()=>{
             this.play()
            this.formatTime();
         }) 
        
           
      },
      currentTime(newvalue){
        this.$bus.$emit('time',newvalue);
      }
      ,
       playingIndex(value){
           this.currentIndex=value;
       },
       playlist(value){
           this.songlist=value
       },
        playing(value){
           this.playing=value
       },
       newsong(value){
         this.song=value;
       },
       volumns(value){
         this.volumn=value;
       // console.log(this.volumn);
        this.$refs.audio.volume=this.volumn;
       },
       currentIndex(value){
         this.$emit('indexmodify',value)
        // console.log(value);
       }

    },
    methods:{
       playsong(){
          if(this.toplay){
              this.pause()
          }else{
              this.play()
          }
      },
      //上一首
      presong(){
        if(this.songready){
            clearInterval(this.timer)
        this.currentTime=0;
          this.formatTime();
        this.currentIndex=this.currentIndex-1<0?this.currentIndex=this.songlist.length-1:this.currentIndex-1;
      
        this.currentId=this.songlist[this.currentIndex].songid;
       
        
         this.song=this.songlist[this.currentIndex]
         
         let songstate={
              id:this.currentId,
              activeIndex:this.currentIndex,
              isPlay:this.toplay,
              song:this.song
          }
        this.$emit('playstate',songstate);
        
        }
      },
      //下一首
      nextsong(){
        if(this.songready){
           clearInterval(this.timer)
        this.currentTime=0;
         this.formatTime();
        // 更新当前的索引
        this.currentIndex=this.currentIndex+1>=this.songlist.length?this.currentIndex=0:this.currentIndex+1;
        // 更新当前的id
        this.currentId=this.songlist[this.currentIndex].songid;
        // 更新当前的歌曲
         this.song=this.songlist[this.currentIndex]
        
         let songstate={
              id:this.currentId,
              activeIndex:this.currentIndex,
              isPlay:this.toplay,
              song:this.song
          }
        // 发送到父组件
        this.$emit('playstate',songstate);
        }
       

       
         
      },
      formatTime(){
        let that=this;
        let curr=0;
        this.timer=setInterval(()=>{
         // console.log(this.$refs.audio.currentTime);
         curr=Math.floor(that.$refs.audio.currentTime)
        // let t=new Date(curr*1000)
       that.currentTime=curr*1000;

       let color= document.querySelector('.colorprogress');
       let width =((that.currentTime/that.song.playtime).toFixed(2))*400
           color.style.width=width+'px'
        
          },1000)
      }
      ,
      //播放错误
          errorsong(){
          this.songready=true;
       }
        ,
       ready(){
         this.songready=true;
       },


      
      //播放
      play(){
          this.$refs.audio.play();
          this.toplay=true
          let songstate={
              id:this.currentId,
              activeIndex:this.currentIndex,
              isPlay:this.toplay,
              song:this.song
          }
          this.$emit('playstate',songstate)
      },
      //暂停
      pause(){
       this.$refs.audio.pause();
        this.toplay=false;
         let songstate={
              id:this.currentId,
              activeIndex:this.currentIndex,
              isPlay:this.toplay,
              song:this.song
          }
        this.$emit('playstate',songstate)
      },
    }
}
</script>

<style scoped>
.Player{
    width: 500px;
    height: 60px;
    margin-left: -100px;
}
.player{
  width: 400px;
  margin: 0 auto;
}
.playbutton{
  width: 140px;
  height: 35px;
 
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}

.time{
  width: 500px;
  height: 25px;
 
 
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;

}

.starttime,.alltime{
  width: 40px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  font-size: 6px;
  font-weight: 100;
}
.starttime span,.alltime span{
  font-size: 5px;
}

.progress{
 margin-top: 5px;
  width: 400px;
  height: 3px;
  border-radius: 50px;
  background-color: #cdcdcd;
}
.colorprogress{
  width: 0;
  height: 3px;
  border-radius: 50px;
  background-color: #ff4e4e;
 
}
.colorprogress:hover{
  height: 6px;
}
.progress:hover{
  height: 6px;
}
.progress:hover .colorprogress{
  height: 6px;
}

.pre{
  width: 30px;
  height: 30px;
  
  text-align: center;
  line-height: 30px;
}
.next{
  width: 30px;
  height: 30px;
  
  text-align: center;
  line-height: 30px;
}
.playbtn{
    width: 35px;
  height: 35px;
  
   border-radius: 50px;
   text-align: center;
   line-height: 35px;
   background-color: #f4f4f4;
   cursor: pointer;
}
.playbtn:hover{
  background-color: #e5e5e5;
}
.pre i:hover,.next i:hvoer{
  color: #ef6767 !important;
}



</style>