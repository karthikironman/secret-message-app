<template>
<div>
    <h1 class="text-center">Secret to Karthik</h1>
    <p class="text-center" >No one can find you, even Karthik. But the Messages will be public!</p>
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
    
    style="width:60%;margin:10px 20%  0 20%;"
    pill 
    variant="outline-secondary" 
    @click="readMessage()" >
    see what other people wrote
</b-button>



<b-list-group style="padding:20px;">
  <b-list-group-item v-for="item in readmsg" class="text-center">{{item.message}}</b-list-group-item>
</b-list-group>

   




</div>
</template>

<script>
export default {
    name:'message',
    data(){
        return{
            msg:null,
            readmsg:[],
            isempty:true
        };
    },
    methods:{
        updateMessage()
        {
            window.db.collection('test').add({
                message:this.msg
            });
        },
         readMessage()
        {
           
            window.db.collection('test').get().then((querySnapshot)=>{
                let allMessages = [];
                querySnapshot.forEach(doc=>{
                    allMessages.push(doc.data())
                })
                this.readmsg = allMessages;
            })
        },
             getRandomColor() {
                    var letters = '0123456789ABCDEF';
                    var color = '#';
                    for (var i = 0; i < 6; i++) {
                        color += letters[Math.floor(Math.random() * 16)];
                    }
                    return color;
                    },



                



        
    }
}

</script>
<style>
</style>