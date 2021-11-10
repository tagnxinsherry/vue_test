<template>
    <div>
        <el-button type="success">登录</el-button>
        <el-button type="info" @click="test">{{ buttonText }}</el-button>
    </div>
</template>>
<script>
export default {
  name: "login",
  data() {
    return {
      buttonText: "Element UI button 2",
    };
  },
  created() {
    console.log("This is vue project!");
  },
  methods: {
    test() {
      alert("Hello dylanz!");
    },
  },
};
</script>

<style>
</style>