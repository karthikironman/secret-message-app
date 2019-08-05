<template>
<div> 
     <h1 class="text-center headings">Secret to Karthik  <font-awesome-icon icon="user-secret" /> </h1>
    <p style='padding: 0 10px 0 10px; ' ><b>Ever hesitated to tell something to Karthik thinking an uncertain reaction back from him. This Web app is right for you! Write and send whatever you thought and Karthik-Ironman will reply you!</b></p>

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

<b-form-input 
    style="width:60%;margin:10px 20% 0 20%;"
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
    variant="outline-secondary" 
    @click="readMessage()" >
    see what other people wrote
</b-button>
<b-button 
    v-if="!isSeeOthers"
    style="width:60%;margin:10px 20%  0 20%;"
    pill 
    variant="outline-secondary" 
    @click="HideMessage()" >
    Hide
</b-button>



<b-list-group v-if="!isSeeOthers" style="padding:20px; margin-bottom:30px;">
  <b-list-group-item v-for="item in readmsg" class="text-center othersMessage">{{item.message }} <br> <b-badge variant="info">{{item.reply}}</b-badge></b-list-group-item>
  
</b-list-group>

   



</div>
<div v-if="isNext==false">
  <div class="putInCenter"><!--this is just for ingognito button -->
       <b-button 
        class="startHere text-center"
        @click="showInput()"
        variant="outline-dark">
        <font-awesome-icon icon="user-secret" /> 
        <h5>start here</h5>
        </b-button>
  </div><!--end of ingognito button -->
</div>
<footers />
</div>

</template>

<script>
import footers from './footer.vue'
export default {
    name:'message',
    components:{
        footers
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
           

        
    }
}

</script>
<style>
.startHere{
   
    font-size:600%;
    background-color: white;
    
    
}
.putInCenter{
width:20%;
margin: 0 40% 0 40%;
}
.headings{
    background-color: black;
    color:white;
    padding:20px;
}
.othersMessage{
    border-top: 2px solid black;
}
</style>