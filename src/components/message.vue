<template>
<div> 
     <h1 class="text-center headings">Secret to Karthik  <font-awesome-icon icon="user-secret" /> </h1>
   

    <div v-if="isNext">
   <b-alert 
    v-if='isempty'
    class="text-center"
    show variant="danger">
    You can't send an empty message
</b-alert>
<b-alert 
    v-if='issent'
    class="text-center"
    show variant="info">
    Message successfully sent!
</b-alert>
<div class="formBox"> <!--start of input form -->
    <br>
    <b-form-input 
    style="width:60%; height:80px;margin:10px 20% 0 20%;"
    placeholder="message"
    v-model="msg"
    />
<b-button 
    style="width:60%;margin:10px 20%  0 20%;"
    pill 
    variant="success" 
    @click="updateMessage()" >
    Send
</b-button>

<b-button 
    v-if="isSeeOthers"
    style="width:60%;margin:10px 20%  0 20%;"
    pill 
    variant="info" 
    @click=" toggleLoading();" >
    see what other people wrote
</b-button>
<span v-if="loading">{{readMessage()}}</span>
<b-button 
    v-if="!isSeeOthers"
    style="width:60%;margin:10px 20%  0 20%;"
    pill 
    variant="outline-secondary" 
    @click="HideMessage()" >
    Hide
</b-button>
  <br> <br>




</div>  <!--end of input form -->




<b-list-group v-if="!isSeeOthers" style="padding:20px; margin-bottom:30px;">
  <b-list-group-item v-for="item in readmsg" class="text-center othersMessage">{{item.message }} <br> <b-badge  variant="info">{{item.reply}}</b-badge>  <br> <img v-if="item.image"  class="replyMsg" v-bind:src="item.image"></b-list-group-item>
  
</b-list-group>

   



</div>
<div class="startPoint" v-if="isNext==false">
  <p class='text-center'><!--this is just for ingognito button -->
       <b-button 
        class="startHere text-center"
        @click="showInput()"
        variant="outline-dark">
        <font-awesome-icon icon="user-secret" /> 
        <h5>start here</h5>
        </b-button>
  </p><!--end of ingognito button -->
</div>
<vue-content-loading v-if="loading==1" :width="300" :height="300">
      <rect x="20%" y="0" rx="8" ry="8" width=60% height="25" speed="5" />
        <rect x="20%" y="40" rx="8" ry="8" width=60% height="25" speed="5" />
          <rect x="20%" y="75" rx="8" ry="8" width=60% height="25" speed="5" />
            <rect x="20%" y="105" rx="8" ry="8" width=60% height="25" speed="5" />
              <rect x="20%" y="140" rx="8" ry="8" width=60% height="25" speed="5" />
                <rect x="20%" y="175" rx="8" ry="8" width=60% height="25" speed="5" />
                  <rect x="20%" y="205" rx="8" ry="8" width=60% height="25" speed="5" />
                    <rect x="20%" y="240" rx="8" ry="8" width=60% height="25" speed="5" />
                      <rect x="20%" y="275" rx="8" ry="8" width=60% height="25" speed="5" />
                        <rect x="20%" y="305" rx="8" ry="8" width=60% height="25" speed="5" />

</vue-content-loading>
<footers />

</div>

</template>

<script>
import VueContentLoading from 'vue-content-loading';
import footers from './footer.vue';

export default {
    name:'message',
    components:{
        footers,
        VueContentLoading,
    },
    data(){
        return{
            msg:'',
            reply:[],
            readmsg:[],
            issent:false,
            isempty:false,
            isNext:false,
            isSeeOthers:true,
            loading:false,
        };
    },
    created:{
       
    },
    methods:{
       
        updateMessage()
        {   if(this.msg==""){this.isempty=true; this.issent=false; return;}
            window.db.collection('test').add({
                message:this.msg
            });
            this.msg="";

            this.issent=true;
            this.isempty=false;

        },
         readMessage()
        {   this.isSeeOthers = false;
           
            window.db.collection('test').get().then((querySnapshot)=>{
                let allMessages = [];
                querySnapshot.forEach(doc=>{
                    allMessages.push(doc.data())
                })
                this.readmsg = allMessages;
               this.loading = false;
            })
               
        },
         HideMessage(){
                this.isSeeOthers = true;
            },
             getRandomColor() {
                    var letters = '0123456789ABCDEF';
                    var color = '#';
                    for (var i = 0; i < 6; i++) {
                        color += letters[Math.floor(Math.random() * 16)];
                    }
                    return color;
                    },
            
            showInput(){
                this.isNext=true;
            },
            toggleLoading()
            {
                this.loading = !this.loading;
            }
           
           

        
    }
}

</script>
<style>
.reply{
 
}
.startHere{
   
    font-size:1000%;
    background-color: white;
    box-shadow:  2px 2px 5px grey;
    
    
}
.putInCenter{
width:10%;
margin: 0 auto;
}
.headings{
    background-color: black;
    color:white;
    padding:20px;
}
.othersMessage{
    border-top: 2px solid black;
}
.startPoint{
   
}
.formBox{
    background-color: black;
    width: 50%;
    margin: 0 auto;
    margin-top:20px;
    border-radius:10px;
}
.replyMsg{
    width:50%;
    height:200px;
    margin:auto;
}
</style>