<template>
    <view class="demo-steps">
      <demo-section>
        <demo-block title="基础用法">
          <van-steps :active="active">
            <van-step>买家下单</van-step>
            <van-step>商家接单</van-step>
            <van-step>买家提货</van-step>
            <van-step>交易完成</van-step>
          </van-steps>

          <van-button @click="nextStep">下一步</van-button>
        </demo-block>

        <demo-block title="竖向步骤条">
          <van-steps
            :active="0"
            direction="vertical"
            active-color="#f44"
          >
            <van-step>
              <view class="h3">【城市】物流状态1</view>
              <view class="p">2016-07-12 12:40</view>
            </van-step>
            <van-step>
              <view class="h3">【城市】物流状态</view>
              <view class="p">2016-07-11 10:00</view>
            </van-step>
            <van-step>
              <view class="h3">快件已发货</view>
              <view class="p">2016-07-10 09:30</view>
            </van-step>
          </van-steps>
        </demo-block>
      </demo-section>
    </view>
</template>

<script>
export default {
  data() {
    return {
      active: 1
    };
  },

  methods: {
    nextStep() {
      this.active = ++this.active % 4;
    }
  }
};
</script>

<style lang="less">
@import '../../../components/van-style/var';

.demo-steps {
  .steps-success,
  .van-icon-location {
    color: @green;
  }

  .van-button {
    margin: 15px 0 0 15px;
  }

  /deep/ .van-steps__message + p {
    margin-bottom: 10px;
  }

  .p,
  .h3 {
    margin: 0;
    font-size: inherit;
    font-weight: normal;
  }
}
</style>
