<template>
    <view class="demo-style">
      <demo-section>
        <demo-block title="文字省略">
          <div class="van-ellipsis">这是一段宽度限制 250px 的文字，后面的内容会省略</div>
        </demo-block>

        <demo-block title="1px 边框">
          <div class="van-hairline--top" />
        </demo-block>

        <demo-block title="动画">
          <van-cell
            is-link
            title="Fade"
            @click="animate('van-fade')"
          />
          <van-cell
            is-link
            title="Slide Up"
            @click="animate('van-slide-up')"
          />
          <van-cell
            is-link
            title="Slide Down"
            @click="animate('van-slide-down')"
          />
          <van-cell
            is-link
            title="Slide Left"
            @click="animate('van-slide-left')"
          />
          <van-cell
            is-link
            title="Slide Right"
            @click="animate('van-slide-right')"
          />
        </demo-block>
        
        <transition :name="transitionName">
          <div
            v-show="show"
            class="demo-animate-block"
          />
        </transition>
      </demo-section>
    </view>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      transitionName: ''
    };
  },

  methods: {
    animate(transitionName) {
      this.show = true;
      this.transitionName = transitionName;

      setTimeout(() => {
        this.show = false;
      }, 500);
    }
  }
};
</script>

<style lang="less">
@import '../../../components/van-style/var';
@import '../../../components/van-style/normalize';
@import '../../../components/van-style/ellipsis';
@import '../../../components/van-style/clearfix';
@import '../../../components/van-style/hairline';
@import '../../../components/van-style/animation';

.demo-style {
  .van-ellipsis {
    font-size: 13px;
    margin-left: 15px;
    max-width: 250px;
  }

  .van-hairline--top {
    height: 30px;
    background-color: @white;

    &::after {
      top: 5px;
    }
  }

  .demo-animate-block {
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    position: fixed;
    border-radius: 3px;
    margin: -50px 0 0 -50px;
    background-color: @blue;
  }
}
</style>
