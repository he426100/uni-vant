<template>
    <view class="demo-tab">
      <demo-section>
        <demo-block title="基础用法">
          <van-tabs v-model="active">
            <van-tab
              :title="'标签' + index"
              v-for="index in tabs"
              :key="index"
            >
              内容 {{ index }}
            </van-tab>
          </van-tabs>
        </demo-block>

        <demo-block title="横向滚动">
          <van-tabs @scroll="onScroll">
            <van-tab
              v-for="index in 8"
              :title="'标签' + index"
              :key="index"
            >
              内容 {{ index }}
            </van-tab>
          </van-tabs>
        </demo-block>

        <demo-block title="禁用标签">
          <van-tabs @disabled="onClickDisabled">
            <van-tab
              v-for="index in 3"
              :title="'标签' + index"
              :disabled="index === 2"
              :key="index"
            >
              内容 {{ index }}
            </van-tab>
          </van-tabs>
        </demo-block>

        <demo-block title="样式风格">
          <van-tabs type="card">
            <van-tab
              v-for="index in 3"
              :title="'标签' + index"
              :key="index"
            >
              内容 {{ index }}
            </van-tab>
          </van-tabs>
        </demo-block>

        <demo-block title="点击事件">
          <van-tabs @click="onClick">
            <van-tab
              v-for="index in 2"
              :title="'标签' + index"
              :key="index"
            >
              内容 {{ index }}
            </van-tab>
          </van-tabs>
        </demo-block>

        <demo-block title="粘性布局">
          <van-tabs
            :active="active"
            sticky
          >
            <van-tab
              :title="'标签' + index"
              v-for="index in tabs"
              :key="index"
            >
              内容 {{ index }}
            </van-tab>
          </van-tabs>
        </demo-block>

        <demo-block title="切换动画">
          <van-tabs
            animated
          >
            <van-tab
              :title="'标签' + index"
              v-for="index in tabs"
              :key="index"
            >
              内容 {{ index }}
            </van-tab>
          </van-tabs>
        </demo-block>

        <demo-block title="滑动切换">
          <van-tabs
            :active="active"
            swipeable
          >
            <van-tab
              :title="'标签' + index"
              v-for="index in tabs"
              :key="index"
            >
              内容 {{ index }}
            </van-tab>
          </van-tabs>
        </demo-block>
      </demo-section>
    </view>
</template>

<script>
    export default {
      data() {
        return {
          active: 2,
          tabs: [1, 2, 3, 4]
        };
      },

      methods: {
        onClickDisabled(index, title) {
          this.$showMsg(title + '已被禁用');
        },

        onClick(index, title) {
          this.$showMsg(title);
        },

        onScroll(e) {
          console.log(e);
        }
      }
    }
</script>

<style lang="less">
@import '../../../components/van-style/var';

.demo-tab {
  margin-bottom: 300px;

  .van-tab .van-icon {
    margin-right: 5px;
    vertical-align: -2px;
  }

  .van-tab__pane {
    background-color: @white;
    padding: 20px;
  }

  .van-tabs--card .van-tab__pane {
    background-color: transparent;
  }

  .custom-tabwrap .van-tab-active {
    color: #20a0ff;
  }

  .custom-tabwrap .van-tabs-nav-bar {
    background: #20a0ff;
  }

  .custom-pane {
    text-align: center;
    height: 50px;
    line-height: 50px;
  }

  .van-doc-demo-block:last-child {
    .van-tab__pane {
      padding: 50px 20px;
    }
  }
}
</style>
