<template>
    <view class="demo-col">
        <demo-section>
            <demo-block title="基本用法">
                <flex-row>
                    <flex-col span="8" custom-class="dark">span: 8</flex-col>
                    <flex-col span="8" custom-class="light">span: 8</flex-col>
                    <flex-col span="8" custom-class="dark">span: 8</flex-col>
                </flex-row>

                <flex-row>
                    <flex-col span="4" custom-class="dark">span: 4</flex-col>
                    <flex-col span="10" offset="4" custom-class="light">offset: 4, span: 10</flex-col>
                </flex-row>

                <flex-row>
                    <flex-col offset="12" span="12" custom-class="dark">offset: 12, span: 12</flex-col>
                </flex-row>
            </demo-block>

            <demo-block title="设置列元素间距">
                <flex-row gutter="10">
                    <flex-col span="8" custom-class="dark">span: 8</flex-col>
                    <flex-col span="8" custom-class="light">span: 8</flex-col>
                    <flex-col span="8" custom-class="dark">span: 8</flex-col>
                </flex-row>
            </demo-block>
            
            <!-- #ifndef MP-WEIXIN -->
            <demo-block title="Flex 布局">
                <flex-row type="flex">
                    <flex-col span="6">span: 6</flex-col>
                    <flex-col span="6">span: 6</flex-col>
                    <flex-col span="6">span: 6</flex-col>
                </flex-row>

                <flex-row type="flex" justify="center">
                    <flex-col span="6">span: 6</flex-col>
                    <flex-col span="6">span: 6</flex-col>
                    <flex-col span="6">span: 6</flex-col>
                </flex-row>

                <flex-row type="flex" justify="end">
                    <flex-col span="6">span: 6</flex-col>
                    <flex-col span="6">span: 6</flex-col>
                    <flex-col span="6">span: 6</flex-col>
                </flex-row>

                <flex-row type="flex" justify="space-between">
                    <flex-col span="6">span: 6</flex-col>
                    <flex-col span="6">span: 6</flex-col>
                    <flex-col span="6">span: 6</flex-col>
                </flex-row>

                <flex-row type="flex" justify="space-around">
                    <flex-col span="6">span: 6</flex-col>
                    <flex-col span="6">span: 6</flex-col>
                    <flex-col span="6">span: 6</flex-col>
                </flex-row>
            </demo-block>
            
            <demo-block title="双列布局">
                <flex-row justify="space-between" wrap gutter="10">
                    <flex-col :span="12">span: 12</flex-col>
                    <flex-col :span="12">span: 12</flex-col>
                    <flex-col :span="12">span: 12</flex-col>
                    <flex-col :span="12">span: 12</flex-col>
                </flex-row>
            </demo-block>
            
            <demo-block title="图标在右侧">
                <flex-row>
                    <flex-col auto>span: auto</flex-col>
                    <flex-col><icon type="warn" size="24"  style="margin: 0 5px;"/></flex-col>
                </flex-row>
            </demo-block>
            <!-- #endif -->
        </demo-section>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                title: 'Hello'
            }
        },
        onLoad() {},
        methods: {}
    }
</script>

<style lang="less">
    .demo-col {
        .demo-block {
            padding: 0 15px;
        }
            
        /deep/ .demo-block__title {
            padding-left: 0;
        }
            
        .flex-col {
            color: #fff;
            font-size: 13px;
            line-height: 30px;
            text-align: center;
            margin-bottom: 10px;
            background-clip: content-box;
            
            &:nth-child(odd) {
                background-color: #39a9ed;
            }
            
            &:nth-child(even) {
                background-color: #66c6f2;
            }
        }
        
        .plr10 {
            padding-left: 10rpx;
            padding-right: 10rpx;
        }
        
        //#ifdef MP-WEIXIN
        .dark, .light {
          color: #fff;
          font-size: 13px;
          line-height: 30px;
          text-align: center;
          margin-bottom: 10px;
          background-clip: content-box;
        }
        
        .dark {
          background-color: #39a9ed !important;
        }
        
        .light {
          background-color: #66c6f2 !important;
        }
        //#endif
    }
</style>
