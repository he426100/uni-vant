<template>
    <view class="demo-button">
      <demo-section>
        <demo-block title="按钮类型">
          <div class="demo-button-row">
            <van-button type="primary">主要按钮</van-button>
            <van-button type="danger">危险按钮</van-button>
          </div>
          <van-button type="default">默认按钮</van-button>
          <van-button type="warning">警告按钮</van-button>
        </demo-block>

        <demo-block title="朴素按钮">
          <van-button
            plain
            type="primary"
            text="朴素按钮"
          />
          <van-button
            plain
            type="danger"
            text="朴素按钮"
          />
        </demo-block>

        <demo-block title="禁用状态">
          <van-button
            disabled
            type="primary"
            text="禁用状态"
          />
          <van-button
            disabled
            type="danger"
            text="禁用状态"
          />
        </demo-block>

        <demo-block title="按钮形状">
          <van-button
            type="primary"
            square
            text="方形按钮"
          />
          <van-button
            type="danger"
            round
            text="圆形按钮"
          />
        </demo-block>

        <demo-block title="按钮尺寸">
          <van-button type="primary" size="large">大号按钮</van-button>
          <van-button type="primary" size="normal">普通按钮</van-button>
          <van-button type="primary" size="small">小型按钮</van-button>
          <van-button type="primary" size="mini">迷你按钮</van-button>
        </demo-block>
      </demo-section>
    </view>
</template>

<script>
    export default {
    }
</script>

<style lang="less">
.demo-button {
  .van-button {
    user-select: none;

    &--large {
      margin-bottom: 15px;
    }

    &--small,
    &--normal:not(:last-child) {
      margin-right: 10px;
    }

    .van-loading {
      margin: 0 18px;
    }
  }

  .demo-block {
    padding: 0 15px;
  }

  /deep/ .demo-block__title {
    padding-left: 0;
  }

  &-row {
    margin-bottom: 10px;
  }
}
</style>
