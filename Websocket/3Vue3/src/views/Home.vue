<template>
  <div class="home" style="display:flex">
    <div>
      <input type="text" v-model="state.msg" />
      <button @click="handlerSentBtnClcik">发送</button>
    </div>
    <div>
      <ul>
        <li v-for="(item, i) in state.msglist" :key="i">
          <span>{{ item.name }}</span>
          <i>{{ item.time }}</i>
          <p>{{ item.msg }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useWebSocket } from "../hooks";
export default {
  name: "Home",
  setup() {
    const state = reactive({
      msg: "",
      msglist: [],
    });
    const router = useRouter();

    const username = localStorage.getItem("username");

    const ws = useWebSocket(handleMessage);
    
    const handlerSentBtnClcik = () => {
      const data ={
        name: username,
        time: new Date().toLocaleString(),
        msg: state.msg,
      }
      ws.send(JSON.stringify(data))
      state.msg = "";
    };

    function handleMessage(e) {
      state.msglist.push(JSON.parse(e.data));
    }

    onMounted(() => {
      if (!username) {
        router.push("/login");
      }
    })

    return {
      state,
      handlerSentBtnClcik,
    };
  },
};
</script>
