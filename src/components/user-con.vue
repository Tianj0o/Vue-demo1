<template>
    <div class="user-con" @click="sayname">
            <div class="user-contents">
               {{username}} {{text.id}}:{{ text.content }}
            </div>
        </div>
</template>
<script>
export default {
    name:'userconitem',
    props:{
        username:{
            type:String,
            required:true
        },
        text:{
            type:Object,
            required:true
        }
    },
    methods:{
        sayname(){
            this.$emit('favorite',this.text.id);
        }
    }
}
</script>
<style lang='scss' scoped>
.user-con {
    position: relative;
    margin-top: 20px;
    border: whitesmoke solid 2px;
    transition: all 0.25s ease;
    &:hover {
    transform: scale(1.1, 1.1);
  }
    .user-contents {
   margin: 10px;
   color: rgb(143, 51, 155);
   font-size: large;
}
}


</style>