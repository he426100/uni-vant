<template>
    <view class="demo-cell">
      <demo-section>
        <demo-block title="基础用法">
          <van-cell-group>
            <van-cell
              title="单元格"
              value="内容"
            />
            <van-cell
              title="单元格"
              value="内容"
              label="描述信息"
            />
          </van-cell-group>
        </demo-block>

        <demo-block title="单元格大小">
          <van-cell
            title="单元格"
            value="内容"
            size="large"
          />
          <van-cell
            title="单元格"
            value="内容"
            size="large"
            label="描述信息"
          />
        </demo-block>

        <demo-block title="展示图标">
          <van-cell
            title="单元格"
            value="内容"
            icon="location-o"
          />
        </demo-block>

        <demo-block title="只设置value">
          <van-cell value="内容" />
        </demo-block>

        <demo-block title="展示箭头">
          <van-cell
            title="单元格"
            is-link
          />
          <van-cell
            title="单元格"
            is-link
            value="内容"
          />
          <van-cell
            title="单元格"
            is-link
            arrow-direction="down"
            value="内容"
          />
        </demo-block>

        <demo-block title="页面跳转">
          <van-cell
            title="单元格"
            is-link
            url="/pages/index/index"
          />
          <van-cell
            title="单元格"
            is-link
            to="/pages/index/index"
          />
        </demo-block>

        <demo-block title="高级用法">
          <van-cell
            value="内容"
            icon="shop-o"
            is-link
          >
            <template slot="title">
              <text class="custom-text">单元格</text>
              <van-tag type="danger">标签</van-tag>
            </template>
          </van-cell>
          <van-cell
            title="单元格"
            icon="location-o"
            is-link
          />
          <van-cell title="单元格">
            <van-icon
              slot="right-icon"
              name="search"
              class="custom-icon"
            />
          </van-cell>
        </demo-block>
      </demo-section>
    </view>
</template>

<script>
    export default {
    }
</script>

<style lang="less">
.demo-cell {
  .custom-text {
    margin-right: 5px;
    vertical-align: middle;
  }

  .custom-icon {
    line-height: 24px;
  }
}
</style>
