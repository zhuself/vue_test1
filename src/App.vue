
<template>
    <!-- <img src="./assets/green.jpg"> -->
    <router-view class="fs-text" id="app"></router-view>
</template>
 
<script>
export default {
  name: 'app',
  mounted () {
    this.$Message.config({
      top: 50,
      duration: 6
    })
  }
}
</script>
 
<style lang="less">
@import './assets/css/theme.less';
</style>