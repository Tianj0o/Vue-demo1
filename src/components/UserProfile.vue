<template>
  <div class="userInfor">
    <div class="user">
      <h1 class="username">@{{ user.name }}</h1>
      <div class="user-admin" v-if="user.admin">Admin</div>
      <div class="user-admin" v-else>Not Admin</div>
      <div class="fans">
        <strong>Fans:{{ fans }}</strong>
      </div>
      <form class="userinput1" @submit.prevent="SentNewMessages">
        <textarea
          id="userinputs"
          class="textarea1"
          rows="4"
          v-model="newmessage"
        >
        </textarea>
        <strong class="type">Type</strong>
        <select v-model="type">
          <option
            :value="items.value"
            v-for="items in inputs"
            :key="items.name"
          >
            {{ items.value }}
          </option>
        </select>
        <div class="textLength">{{ newMessages }}/180</div>
        <button>sent!</button>
      </form>
    </div>
  </div>

  <div class="contents">
    <userconitem
      v-for="text in user.messages"
      :key="text.id"
      :username="user.name"
      :text="text"
      @favorite="sayname"
    />
  </div>
</template>
<script>
import userconitem from "./user-con.vue";
export default {
  name: "userprofile",
  data() {
    return {
      newmessage: "",
      type: "message",
      inputs: [
        { value: "草稿", name: "草稿" },
        { value: "message", name: "message" },
      ],
      fans: 0,
      user: {
        name: "Qitianjia",
        firstname: "Qi",
        lastname: "tianjia",
        tel: "18175451111",
        admin: true,
        messages: [
          { id: 1, content: "Vue is great" },
          { id: 2, content: "i love Vue" },
        ],
      },
    };
  },
  components: {
    userconitem,
  },
  computed: {
    fullName() {
      return `${this.user.lastname} ${this.user.firstname}`;
    },
    newMessages() {
      return this.newmessage.length;
    },
  },
  methods: {
    addfans() {
      this.fans++;
    },
    sayname(id) {
      console.log(`you has choose # ${id}`);
    },
    SentNewMessages() {
      if (this.newmessage && this.type !== "草稿") {
        this.user.messages.push({
          id: this.user.messages.length + 1,
          content: this.newmessage,
        });
      }
      this.newmessage = "";
    },
  },
  mounted() {
    this.addfans();
    this.addfans();
  },
  watch: {
    fans(nowcount, oldcount) {
      if (nowcount > oldcount) {
        console.log(`you have gained ${nowcount - oldcount} fan`);
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.userInfor {
  float: left;
  margin: 20px;
  .user {
    height: 200px;
    width: auto;
    width: 270px;
    background-color: #f3f5fa;
    position: relative;

    float: left;
    border: rgb(161, 157, 157) solid 2px;
    .fans {
      position: absolute;
      right: 10px;
      top: 20px;
      color: pink;
    }
    .username {
      position: absolute;
      top: -10px;
      left: 10px;
    }

    .user-admin {
      position: absolute;
      color: white;
      background-color: purple;
      top: 50px;
      left: 10px;
      border-radius: 7px;
      width: 75px;
      height: 23px;
      text-align: center;
      line-height: 23px;
    }
    .userinput1 {
      position: relative;
      height: 130px;
      top: 70px;
      left: 0;
      .textarea1 {
        position: absolute;
        bottom: 21px;
        left: 0;
      }
      .type {
        position: absolute;
        bottom: 0px;
        left: 0;
      }
      select {
        position: absolute;
        bottom: 0px;
        left: 40px;
      }
      .textLength {
        position: absolute;
        bottom: 0px;
        right: 60px;
      }
      button {
        position: absolute;
        bottom: 0px;
        right: 10px;
      }
    }
  }
}
.contents {
  float: left;
  height: 214px;
  
}
</style>