<template>
  <div class="rightcontent">
      <div class="voice" v-show="list.length" @mouseleave="overvoice">
           <div class="volumn"  v-show="show" >
              <div class="vioceprogress" @click="controlVolum($event)" ref="volume" >
                  <div class="Vprogress">
                      <li class="dot"></li>
                  </div>
              </div>
          </div>
          <i class="iconfont icon-maikefeng" @mouseover="overvoice" ></i>
      </div>
      <div class="songmenu" v-show="list.length">
            <div class="list" v-show="isopen" ref='list'>
                <h2 class="listtitle">当前播放</h2>
                <div class="make">
                    <span class="totalsong">总{{list.length}}首</span>
                    <div class="makeoperation">
                        <span class="addall">
                            <i class="iconfont icon-gouwuche icon"></i>
                            <span>收藏全部</span>
                        </span >
                        <span class="clear" @click="clearsong">清空列表</span>
                    </div>
                </div>
                <div class="list-content">
                <li v-for="(item,index) in list" :key="item.songid" :class="{'isActive':activeindex===index}" class="listitem"  @dblclick="playsong(item,index)" @click="clicksong(index)">
                    <span class="list-name" :class="{'isPlay':playIndex===index}">{{item.songname}}</span>
                   
                    <span class="list-time">{{item.playtime |filterTime}}</span>
                </li>
                </div>
            </div>
          <i class="iconfont icon-caidan" @click.stop="handleMenu"></i>
      </div>
  </div>
</template>

<script>
export default {
    name:'rightcontent',
    props:{
        playlist:{
            type:Array
        },
        activeIndex:{
            type:Number
        }
    },
    data(){
        return{
            list:this.playlist,
            isopen:false,
            playIndex:this.activeIndex,
            activeindex:-1,
            show:false
        }
    },
    methods:{
        controlVolum(e){
            let progress=document.querySelector('.Vprogress')
            let length=(685-e.clientY)
            let volumn=length/85
            progress.style.height=`${length}px`
            // volumn.toFixed(1);
            if(volumn.toFixed(1)<0){
                volumn=0
            }else if(volumn.toFixed(1)>1){
                volumn=1
            }
            this.$emit('modifyVolumn',volumn.toFixed(1))
        },
        overvoice(e){
            this.show=!this.show
        },
        //清除播放列表的音乐
        clearsong(){
            this.list=[]
            this.$bus.$emit('closesong')
        },
        newcontrol(e){
            console.log(e);
        },
        handleMenu(e){
            console.log(e);
            this.isopen=!this.isopen;
        },
        //播放
        playsong(song,index){
            this.playIndex=index;
            let list_state={
                songindex:this.playIndex,
                song:song,
                playlist:this.list
            }
            this.$bus.$emit('playsong',list_state);
        },
        clicksong(index){
            this.activeindex=index;

        }
    },
    watch:{
        playlist(value){
            this.list=value;
        },
        activeIndex(value){
            this.playIndex=value;
        }

    }
    ,
    mounted(){
        this.$bus.$on('playsong',item=>{
                this.list=item.playlist;
                //this.isopen=false;
        }),
        document.addEventListener('click',(e)=>{
            let list=this.$refs.list;
          //  console.log(list.contains(e.target));
            if(!list.contains(e.target)){
                this.isopen=false
            }
               
            
        })
    }
}
</script>

<style scoped>
.rightcontent{
    width: 200px;
    height: 60px;
   
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.listtitle{
    font-weight: 24px;
    font-weight: 500;
    margin-left:10px ;
    font-size: 20px;
}
.make{
    display: flex;
    justify-content: space-between;
    width: 400px;
    height: 40px;
    align-items: center;
}
.totalsong{
    font-size: 10px;
    color: #dfcfdf;
    margin-left: 15px;
}
.makeoperation{
    width: 200px;
    font-size: 13px;
    height: 40px;
     line-height: 40px;
     
   
}
.isPlay{
  color: #ec4141;
}
.addall{
   font-size: 13px;
    color: #373737;
   
}
.icon{
    font-size: 18px !important;
}
.clear{
    color: #507daf;
    margin-left: 15px;
}
.listitem{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    height: 30px;
    font-size: 12px;
    
}
.isActive{
  background-color: #e5e5e5 !important;
}
.list-name{
    margin-left: 15px;
}
.list-content{
    width: 393px;
    height: calc(100%-280);
    position: fixed;
    top: 159px;
    bottom: 79px; 
   
    right: 0;
    overflow: scroll; 
    overflow-x:hidden ; 
}
.list-time{
    margin-right: 30px;
}
.listitem:nth-child(even){
    background-color: #f9f9f9;
}
.listitem:nth-child(odd){
    background-color: #ffffff;
}
.songmenu,.voice{
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
}
.songmenu{
    margin-right: 5px;
    position: relative;
  
}
.songmenu i{
    font-size: 27px;
    color: #666666;
}
.voice{
      position: relative;
      
      width: 30px;
      height: 150px;
      top: -50px;
      
}
.voice i{
    font-size: 20px;
     color: #666666;
}
.songmenu i:hover{
       color: #3f3f3f;
}
.voice i:hover .volumn{
    display: block;
}
.volumn{
 
    width: 30px;
    height: 110px;
    position: absolute;
    left: 0px;
    top: 0px;
    border-radius: 5px;
    background-color: #ffffff;
    z-index: 50;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.iconfont{
    position: absolute;
    bottom: 0px;
    left: 5px;
}
.vioceprogress{
    width: 5px;
    height: 85px;
    background-color: #cdcdcd;
    border-radius: 8px;
    margin: 15px auto;
    position: relative;

}
.Vprogress{
    width: 5px;
    height: 25px;
    border-radius: 5px;
    background-color: #ef6767;
    position: absolute;
    
    bottom: 0;
}
/* .dot{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-left:auto ;
    transform: translateX(-50%);
    /* transform: translateY(85px); */
    /* background-color: #ef6767;} */ 
.list{
    width: 400px;
    /* height: 604px; */
    height: calc(100%-128);
    background-color: #ffffff;
    /* overflow: auto; */
    position: fixed;
    top: 69px;
    bottom: 81px;
    right: -5px;
    /* float: right; */
    z-index: 45;
    
     box-shadow: 0 0px 2px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

}
</style>