<template>
  <div class="album albumvideo">
  <div class="pic_block" v-if = "EarFaceURL !=''"> 
  <div style="height:100px;">
   <el-button v-if="resultForm==''" type="primary" @click="submit">{{buttonLog}}</el-button>
   <span v-else >{{resultForm}}</span>  
  </div>
   <div style=" padding-left:50px;padding-right:50px;text-align:center">
    <el-image 
      style="width: 200px; height: 200px;margin-bottom:80%;border:#999 solid 1px;padding:20px;"
      :src="EarFaceURL"
      fit = "contain"
      ></el-image>
    
    </div>
   </div>

    <div style="display:inline-block;">
        <p class="type_title">
            <span>上传视频</span>
        </p>
        <div class="pic_img">
            <div class="pic_img_box">
                <el-upload class="avatar-uploader"
                           action="http://localhost:5000/upload"
                           v-bind:data="{FoldPath:'上传目录',SecretKey:'安全验证'}"
                           v-bind:on-progress="uploadVideoProcess"
                           v-bind:on-success="handleVideoSuccess"
                           v-bind:before-upload="beforeUploadVideo"
                           v-bind:show-file-list="false">
                    
                    <i v-if="videoForm.showVideoPath =='' && !videoFlag"
                       class="el-icon-plus avatar-uploader-icon"></i>
                    <el-progress v-if="videoFlag == true"
                                 type="circle"
                                 v-bind:percentage="videoUploadPercent"
                                 style="margin-top:30px;"></el-progress>
                </el-upload>
                <video v-if="videoForm.showVideoPath !='' && !videoFlag"
                           v-bind:src="videoForm.showVideoPath"
                           class="avatar video-avatar"
                           controls="controls">
                        您的浏览器不支持视频播放
                </video>
            </div>
        </div>
    <p class="Upload_pictures">
        <span></span>
        <span>最多可以上传1个视频,推荐格式mp4</span>
    </p>
    </div>
</div>
</template>

<script>
import layer from 'vue-layer'
import axios from 'axios'
export default {
  name: 'VideoGetEar',
        data(){
          return{
            videoFlag: false,
            //是否显示进度条
            videoUploadPercent: '',
            //进度条的进度，
            isShowUploadVideo: false,
            //显示上传按钮
            videoForm: {
                showVideoPath: ''
            },
            EarFaceURL:'',
            resultForm:'',
            buttonLog:'确认对象',
            
        }},
        methods:{
            //上传前回调
            beforeUploadVideo(file) {
                var fileSize = file.size / 1024 / 1024 < 50;
                if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1) {
                    layer.msg("请上传正确的视频格式");
                    return false;
                }
                if (!fileSize) {
                    layer.msg("视频大小不能超过50MB");
                    return false;
                }
                this.isShowUploadVideo = false;
            },
            //进度条
            uploadVideoProcess(event, file) {
                this.videoFlag = true;
                this.videoUploadPercent = file.percentage.toFixed(0) * 1;
            },
            //上传成功回调
            handleVideoSuccess(res) {
                this.isShowUploadVideo = true;
                this.videoFlag = false;
                this.videoUploadPercent = 0;
                
                //前台上传地址
               // if (file.status == 'success' ) {
               //     this.videoForm.showVideoPath = file.url;
               // } else {
               //      layer.msg("上传失败，请重新上传");
               // }

                //后台上传地址
                if (res.Code == 0) {
                    this.videoForm.showVideoPath = res.data;
                    console.log(this.videoForm.showVideoPath);
                    this.EarFaceURL = "http://localhost:5000/static/face_ear/1_0.jpg";
                } else {
                    layer.msg(res.Message);
                }
            },
            submit(){
                this.buttonLog = '请稍后';
                axios.get("http://localhost:5000/submit?code=1")
                .then((response) => {
                   
                    this.resultForm = response.data
                })
                .catch( (error) => {
                    console.log(error);
                })
               
                
            }
            
          }
          
        
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
.album{
  text-align:center;
}
.type_title{
  font-size:30px;
}
.avatar-uploader{
    
  
}
i{
  height: 550px;
  width: 350px;
  background:url("../picture/add1.jpg") no-repeat center;
  opacity:0.5;
  background-size:25% 15%;
  background-color:#efefef;
  border:#333333 dotted 3px;
}
video{
  margin-left: 30px;
  width:350px;
}
.pic_block{
    
    
    display:inline-block;
    padding:50px;
    
}
</style>
