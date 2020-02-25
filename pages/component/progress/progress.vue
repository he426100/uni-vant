<template>
    <view class="demo-progress">
      <demo-section>
        <demo-block title="基础用法">
          <van-progress :percentage="50" />
        </demo-block>

        <demo-block title="置灰">
          <van-progress
            inactive
            :percentage="50"
          />
        </demo-block>

        <demo-block title="样式定制">
          <van-progress
            color="#f2826a"
            :percentage="25"
            pivot-text="橙色"
          />
          <van-progress
            color="#f44"
            :percentage="50"
            pivot-text="红色"
          />
          <van-progress
            :percentage="75"
            pivot-text="紫色"
            pivot-color="#7232dd"
            color="linear-gradient(to right, #be99ff, #7232dd)"
          />
        </demo-block>
      </demo-section>
    </view>
</template>

<script>
    export default {
    }
</script>

<style lang="less">
.demo-progress {
  .van-progress {
    margin: 20px;

    &:first-of-type {
      margin-top: 5px;
    }
  }
}
</style>
