<template>
<div >
    
        <h1>LOGIN</h1>
           <b-form-input  :state="checkMail()" v-model="mailid" placeholder="Enter your college mail id"></b-form-input>
        <div v-if="!checkMail()" class="alert-danger">Entry only for Cambridge institute of technology emails</div>
          <b-button pill variant="outline-primary">next</b-button>
</div>


</template>
<script>

export default {
    name:"login",
    data(){
        return{
        
            mailid:'',
            isStarted: false,
              
        };
    },
    created:{
      
    },
    methods:{
        checkMail(){
             if(this.mailid.length < 1) return true;
            var atposition=this.mailid.indexOf("@");
            var dotposition=this.mailid.lastIndexOf(".");
            if (atposition<1 || dotposition<atposition+2 || dotposition+2>=this.mailid.length)
            return false;
            else 
            return true;
     },   
     
    }
  
}

</script>
<style>

</style>