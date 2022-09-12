<template>
  <img class="heart-icon" src="../assets/cards-heart.svg" style="color: red" />
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HeartIcon extends Vue {}
</script>

<style lang="less" scoped>
.heart-icon {
  position: absolute;
  fill: red;
  right: 0;
  width: 24px;
  height: 24px;
}
</style>
