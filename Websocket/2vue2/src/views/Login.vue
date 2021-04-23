<template>
  <div class="about">
   <input type="text" placeholder="请输入姓名" v-model="username">
   <button @click="handleEnterBtn">进入聊天室</button>
  </div>
</template>
<script>
export default {
  data(){
    return {
      username:'',
    }
  },
  methods:{
    handleEnterBtn(){
      const username = this.username.trim();
      if(username.length<6){
        alert('昵称必须大于六位');
        return;
      }
      localStorage.setItem('username',username);
      this.$router.push('/')
      
    }
  }
}
</script>
