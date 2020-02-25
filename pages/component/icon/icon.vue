<template>
    <view class="demo-icon">
      <demo-section>
            <view class="van-tabs van-tabs--line">
              <view class="van-tabs__wrap van-hairline--top-bottom">
                  <view class="van-tabs__nav van-tabs__nav--line">
                      <view v-for="(item, index) in tabs" :key="index" class="van-tab" @click="selectTab(index)" :class="{'van-tab--active': tab == index}">
                          <text class="van-ellipsis">{{item.title}}</text>
                      </view>
                  </view>
              </view>
              <view class="van-tabs__content">
                  <view v-for="(item, index) in tabs" :key="index"  class="van-tab__pane" v-show="tab == index">
                      <flex-row wrap>
                        <flex-col
                          v-for="icon in icons[item.name]"
                          :key="icon"
                          span="6"
                        >
                          <van-icon :name="icon" />
                          <text>{{ icon }}</text>
                        </flex-col>
                      </flex-row>
                  </view>
              </view>
            </view>
      </demo-section>
    </view>
</template>

<script>
    import icons from '@/components/vant/icons';
    import { BLUE } from '@/utils/van-utils/color.js';

    export default {
      data() {
        this.BLUE = BLUE
        this.icons = icons
        return {
            tabs: [{
                title: '基础图标',
                name: 'basic'
            }, {
                title: '线框风格',
                name: 'outline'
            }, {
                title: '实底风格',
                name: 'filled'
            }],
            tab: 0
        }
      },
      methods: {
          selectTab (index) {
              this.tab = index
          },
      }
    }
</script>

<style lang="less">
@import '../../../components/van-style/var';
@import '../../../components/van-tabs/index.less';

.demo-icon {
  font-size: 0;

  &-list {
    padding-top: 10px;
    box-sizing: border-box;
    min-height: calc(100vh - 65px);
  }

  .flex-col {
    text-align: center;
    height: 100px;
    display: inline-block;
    vertical-align: middle;

    text {
      display: block;
      padding: 0 5px;
      font-size: 12px;
      line-height: 14px;
    }
  }

  .van-icon {
    font-size: 32px;
    margin: 15px 0;
    color: @text-color;
  }

  .van-tab__pane {
    padding-top: 10px;
  }
}
</style>
