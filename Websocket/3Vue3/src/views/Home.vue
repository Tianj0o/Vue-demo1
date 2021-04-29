<template>
  <div class="main" :style="'height:' + screenHeight + 'px;'">
    <div class="home" style="display: flex; flex-direction: column">
      <div
        ref="myref"
        id="chatlist"
        :style="'height:' + 0.9 * screenHeight + 'px;'"
      >
        <ul id="msglists" style="display: flex; flex-direction: column;">
          <li v-for="(item, i) in state.msglist" :key="i" style="margin-left:2rem;margin-bottom:0.5rem">
            <div style="margin: 0.5rem 0">
              <span>{{ item.name }}</span>

              <i style="font-size: 0.7rem">{{ item.time }}</i>
            </div>
            <div>
              <span class="context">{{ item.msg }}</span>
            </div>
          </li>
        </ul>
      </div>

      <div id="inputdiv" style="display: flex">
        <input
          @keyup.enter="handlerSentBtnClcik"
          type="text"
          v-model="state.msg"
          style="outline: none; padding: 0 1rem;height:2rem;font-size:1.1rem;"
        />
        <button @click="handlerSentBtnClcik">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-SEND"></use>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { reactive, onMounted, ref } from "vue";
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
      const data = {
        name: username,
        time: new Date().toLocaleString().toString().split("下午")[1],
        msg: state.msg,
      };
      //单独显示自己发出去的信息

      const msglist = document.querySelector('#msglists')
      const myli = document.createElement('li')
      myli.innerHTML=`
          <li style="display:flex;flex-direction:column;align-items:flex-end;margin-right:2rem;margin-bottom:0.5rem">
            <div style="margin: 0.5rem 0">
              <span>${ data.name }</span>

              <i style="font-size: 0.7rem">${ data.time }</i>
            </div>
            <div>
              <span class="context">${ data.msg }</span>
            </div>
          </li>
      `
      msglist.appendChild(myli)
      ws.send(JSON.stringify(data));
      state.msg = "";
      // console.log(myref.value.offsetHeight)
      // console.log(
      //   myref.value.scrollTop,
      //   myref.value.scrollHeight,
      //   myref.value.offsetHeight
      // );
      setTimeout(
        () =>
          (myref.value.scrollTop =
            myref.value.scrollHeight - myref.value.offsetHeight),
        10
      );
      // console.log(myref.value.scrollTop,myref.value.scrollHeight)
    };

    function handleMessage(e) {
      state.msglist.push(JSON.parse(e.data));
    }
    function handlekeyup(e) {
      if (e && e.key === 13) {
        handlerSentBtnClcik();
      }
    }
    onMounted(() => {
      setHeight();
      if (!username) {
        router.push("/login");
      }
      // console.log(myref.value.scrollHeight)
      //查找滚动条的位置
      // const nowscrollHeight = myref.value.screenHeight
      // const nowscrollTop = myref.value.screenTop

      // console.log(myref.value.scrollTop)
      // setInterval(()=>myref.value.scrollTop=myref.value.scrollHeight,1000)
    });

    //监控屏幕高度
    const screenHeight = ref(0);
    const setHeight = () => {
      const nowheight = window.innerHeight;
      screenHeight.value = nowheight;
    };

    const myref = ref(null);
    /* const run = ()=>{

    }
    setInterval(run,1000) */
    // console.dir(scrollHeight.scrollHeight)
    // watchEffect(()=>console.log(myref.value))
    return {
      state,
      handlerSentBtnClcik,
      screenHeight,
      myref,
      handlekeyup,
    };
  },
};
</script>


<style>
ul {
  margin:0;
  padding: 0;
}
.main {
  width: 100%;
  height: 100%;
  background: url("../assets/1.jpg") no-repeat center center fixed;
  background-size: cover;
}
.main .home {
  height: 100%;
  width: 100%;
}
#chatlist {
  overflow: auto;
}
#chatlist ul li div .context {
  background-color: whitesmoke;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  border-radius: 0.5rem;
  display: inline-block;
  width: auto;
  padding: 0 0.5rem;
}
li {
  list-style: none;
}
#inputdiv input {
  height: 1.4rem;
  margin: 0 1rem;
  border: transparent;
  background-color: whitesmoke;
  border-radius: 0.5rem;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>