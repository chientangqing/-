<template>
  <div class="menu-cat">
      
      <div class="catebutton">
          <!-- 按钮 -->
         <div class="button" @click.stop="clicktpye">
                <span v-if="catename!=='全部'">{{catename}}</span>
                <span v-else>全部歌单</span>
                <i class="el-icon-arrow-right"></i>
        </div>

        <!-- 类型列表 -->
        <div class="cate-content" v-show="typeclick">
              <div class="allmenu" >
                  <div class="all-menu">
                      <li :class="{'clickActive':'全部'===catename}">
                          <span @click="selectCate('全部')">全部歌单</span>
                      </li>
                  </div>
                  <div v-for="(item1,index1) in catedata" :key="item1.name" class="itemtypes">
                    <li class="typename">
                        <span>{{item1.name}}</span>
                    </li>
                    <div class="itemelement">
                        <li v-for="(item2,index2) in item1.sub" :key="index2" :class="{'clickActive':item2.name===catename}">
                            <span @click="selectCate(item2.name)">{{item2.name}}</span>
                        </li>
                    </div>    
                    </div>
              </div>  
          </div>
  
        </div>
    <!-- 热门类型 -->
      <div class="hotcategory">
                 <li v-for="(item,index) in hotdata" class="hotitem" :class="{'clickActive':item.name===catename}">
                     <span @click="selectCate(item.name)">{{item.name}}</span>
                </li>
            
        </div>
              
     
  </div>
</template>

<script>
export default {
    name:'menu-cat',
    props:{
        hotdata:{
            type:Array
        },
        catedata:{
            type:Array
        }
    },
    methods:{
        // 选择列表中的类型
        selectCate(name){
            
            this.catename=name;
            // 保存到localstorage
            window.localStorage.setItem('menuSelect',JSON.stringify(this.catename))
            // 发送组件
            this.$emit('selectCate',name);
                
        },
        // 点击列表
        clicktpye(){
            this.typeclick=!this.typeclick;
        }
    },
    data(){
        return{
            // 类型名称
            catename:'全部',

            // 判断是否点击
            typeclick:false
        }
    },
    mounted(){
        // 点击列表外的区域，将关闭列表
        this.$bus.$on('uclick',userclick=>{
            this.typeclick=userclick;
        })
    },
    created(){
        // 判断localstorage中是否有menuSelect属性
       if(!JSON.parse(window.localStorage.getItem('menuSelect'))){
           window.localStorage.setItem('menuSelect',JSON.stringify('全部'))
       }else{
           this.catename=JSON.parse(window.localStorage.getItem('menuSelect'))
       }   
    }
    

}
</script>

<style scoped>
.menu-cat{
    width: 1050px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
}
.catebutton{
    width: 400px;
    position: relative;
   
}
.all-menu{
    width: 700px;
    margin-left:25px ;
    display: flex;
    height: 55px;
    border-bottom: 1px solid #e5e5e5;
   align-items: center;
}
.all-menu li{
    width: 70px;
    height: 30px;
    border-radius: 50px;
    text-align: center;
    
   
}
.all-menu li span{
    line-height: 30px;
    font-size: 13px;
}
.typename{
    width: 130px;
    height: 30px;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 100;
  color: #cfcfcf;
  line-height: 30px;
  text-align: center;
    
}
.itemtypes{
   
    width: 760px;
    
    display: flex;
    margin-top: 15px;
}

.itemelement{
    display: flex;
    
    flex-wrap: wrap;
    width: 600px;
    justify-content: flex-start;
    
}
.itemelement li{
    width: 70px;
    height: 30px;
    margin-left: 20px;
    font-size: 13px;
    font-weight: 100;
    margin-top: 10px;
   
    text-align: center;
    line-height: 30px;
    border-radius: 50px;
   
    
}
.itemelement li span:hover{
    cursor: pointer;
    color:#ec4141 ;
}
.all-menu span{
    font-size: 14px;
    font-weight: 100;
    line-height: 55px;

}
.button{
    width: 100px;
    height: 30px;
    border: 1px solid #676767;
    border-radius: 50px;
    line-height: 30px;
    text-align: center;
    background-color: #ffffff;
    font-size: 14px;
    color: #676767;
}
.button:hover{
    background-color: #f2f2f2;
    cursor: pointer;
}

.hotcategory{
    width: 600px;
    display: flex;
    justify-content: flex-end;
    line-height: 30px;
    align-items: center;
}

.hotcategory li{
    font-size: 10px;
    margin: 0 8px;
    line-height: 20px;
    height: 20px;
    color: #676767;
}
.hotcategory li span:hover{
    color: #373737;
    cursor:default
}
.cate-content{
    position: absolute;
    width: 760px;
    height: 730px;
    z-index: 50;
    top: 38px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 5px;
}
.hotitem{
    border-radius: 10px;
    
}
.hotitem span{
    padding: 1px 6px;
}
.clickActive{
    background-color: #fdf5f5;
    color: #ec4141 !important;
}

</style>