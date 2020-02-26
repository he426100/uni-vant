<template>
    <view class="demo-icon">
      <demo-section>
          <van-tabs v-model="tab" :color="BLUE">
            <van-tab title="基础图标">
                <flex-row wrap>
                  <flex-col
                    v-for="icon in icons.basic"
                    :key="icon"
                    span="6"
                  >
                    <van-icon :name="icon" />
                    <text>{{ icon }}</text>
                  </flex-col>
                </flex-row>
            </van-tab>
            <van-tab title="线框风格">
                <flex-row wrap>
                  <flex-col
                    v-for="icon in icons.outline"
                    :key="icon"
                    span="6"
                  >
                    <van-icon :name="icon" />
                    <text>{{ icon }}</text>
                  </flex-col>
                </flex-row>
            </van-tab>
            <van-tab title="实底风格">
                <flex-row wrap>
                  <flex-col
                    v-for="icon in icons.filled"
                    :key="icon"
                    span="6"
                  >
                    <van-icon :name="icon" />
                    <text>{{ icon }}</text>
                  </flex-col>
                </flex-row>
            </van-tab>  
          </van-tabs>
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
