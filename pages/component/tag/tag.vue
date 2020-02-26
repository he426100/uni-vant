<template>
    <view class="demo-tag">
      <demo-section>
        <demo-block title="基础用法">
          <van-tag>标签</van-tag>
          <van-tag type="danger">标签</van-tag>
          <van-tag type="primary">标签</van-tag>
          <van-tag type="success">标签</van-tag>
        </demo-block>

        <demo-block title="空心样式">
          <van-tag plain>标签</van-tag>
          <van-tag
            round
            plain
            type="danger"
          >
            标签
          </van-tag>
          <van-tag
            round
            plain
            type="primary"
          >
            标签
          </van-tag>
          <van-tag
            plain
            type="success"
          >
            标签
          </van-tag>
        </demo-block>

        <demo-block title="圆角样式">
          <van-tag round>标签</van-tag>
          <van-tag
            round
            type="danger"
          >
            标签
          </van-tag>
          <van-tag
            round
            type="primary"
          >
            标签
          </van-tag>
          <van-tag
            round
            type="success"
          >
            标签
          </van-tag>
        </demo-block>

        <demo-block title="标记样式">
          <van-tag mark>标签</van-tag>
          <van-tag
            mark
            type="danger"
          >
            标签
          </van-tag>
          <van-tag
            mark
            type="primary"
          >
            标签
          </van-tag>
          <van-tag
            mark
            type="success"
          >
            标签
          </van-tag>
        </demo-block>

        <demo-block title="自定义颜色">
          <van-tag color="#f2826a">标签</van-tag>
          <van-tag
            color="#f2826a"
            plain
          >
            标签
          </van-tag>
          <van-tag color="#7232dd">标签</van-tag>
          <van-tag
            color="#7232dd"
            plain
          >
            标签
          </van-tag>
          <van-tag
            color="#ffe1e1"
            text-color="#ad0000"
          >
            标签
          </van-tag>
        </demo-block>

        <demo-block title="标签大小">
          <van-tag type="danger">标签</van-tag>
          <van-tag
            type="danger"
            size="medium"
          >
            标签
          </van-tag>
          <van-tag
            type="danger"
            size="large"
          >
            标签
          </van-tag>
        </demo-block>
      </demo-section>
    </view>
</template>

<script>
    export default {
    }
</script>

<style lang="less">
.demo-tag {
  .van-tag + .van-tag {
    margin-left: 10px;
  }

  .van-tag {
    &:first-of-type {
      margin-left: 15px;
    }
  }
  
  /* 不知为啥，上面的:first-of-type没生效 */
  .demo-block {
      padding-left: 16px;
      
      /deep/ .demo-block__title {
          padding-left: 0;
      }
  }
}
</style>
