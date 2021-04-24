<template>
  <div>
    <input type="text" placeholder="请输入昵称" v-model="username">
    <button @click="handleEnterBtnClick">进入聊天室</button>
  </div>
</template>

<script>

import {ref,onMounted} from 'vue'
import {useRouter} from 'vue-router'
export default {
  name:'Login',
  
  setup(){
    const username = ref('');
    const router = useRouter();

    const handleEnterBtnClick = ()=>{
          const Username = username.value.trim()
          if(Username.length<6){
            alert('昵称必须大于三位')
            return
          } 
          localStorage.setItem('username',Username)
          router.push('/');

    }
    onMounted(()=>{
      if(localStorage.getItem('username')){
        router.push('/')
      }
    })

    return {
      username,
      handleEnterBtnClick
    }
  }
}
</script>

<style>

</style>
