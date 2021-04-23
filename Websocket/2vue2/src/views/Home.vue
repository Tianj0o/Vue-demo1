<template>
  <div class="home">
    <div style="display: flex">
      <div>
        <input type="text" v-model="msg" />
        <button @click="handleSendBtn">发送</button>
      </div>
      <div>
        <ul id="ulul">
          <li v-for="(item, index) of messageslist" :key="index">
            <span>{{ item.name }}</span>
            <span>  {{item.time}}</span>
            <p>{{item.msg}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const Ws = new WebSocket("ws://localhost:8000");

export default {
  name: "Home",
  data() {
    return {
      username: "",
      messageslist: [],
      msg: "",
    };
  },
  mounted() {
    this.username = localStorage.getItem("username");
    if (!this.username) {
      this.$router.push("/login");
      return;
    }

    Ws.addEventListener("open", this.handleFEopen.bind(this));
    Ws.addEventListener("error", this.handleFEerror.bind(this));
    Ws.addEventListener("message", this.handleFEmessage.bind(this));
    Ws.addEventListener("close", this.handleFEclose.bind(this));
  },
  methods: {
    handleSendBtn() {
      
      const data =JSON.stringify({
        type:'message',
        name:this.username,
        msg:this.msg,
        time:new Date().toLocaleString()
      })
      Ws.send(data);
      this.msg='';
    },
    handleFEopen(e) {
      console.log('open',e)
      const data= JSON.stringify({
        name:this.username,
        type:'init'
      })
      Ws.send(data)
    },
    handleFEerror(e) {
      console.log('error',e)
    },
    handleFEmessage(e) {
      console.log('message',e)
      const data = JSON.parse(e.data)
      switch (data.type){
        case 'init':
          const pli = document.createElement('p')
          const pul=document.querySelector('#ulul')
          pli.innerHTML=`${data.name}进入了房间`
          pul.appendChild(pli)
          console.log(pli.innertext)
          break;
        case 'message':
          this.messageslist.push(data)
      }
      
    },
    handleFEclose(e) {
      console.log('close',e);
    },
  },
};
</script>
