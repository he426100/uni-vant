<template>
    <demo-section>
        <demo-block title="基本用法">
            <flex-row>
                <flex-col span="8">span: 8</flex-col>
                <flex-col span="8">span: 8</flex-col>
                <flex-col span="8">span: 8</flex-col>
            </flex-row>

            <flex-row>
                <flex-col span="4">span: 4</flex-col>
                <flex-col span="10" offset="4">offset: 4, span: 10</flex-col>
            </flex-row>

            <flex-row><flex-col offset="12" span="12">offset: 12, span: 12</flex-col></flex-row>
        </demo-block>

        <demo-block title="设置列元素间距">
            <flex-row gutter="10">
                <flex-col span="8">span: 8</flex-col>
                <flex-col span="8">span: 8</flex-col>
                <flex-col span="8">span: 8</flex-col>
            </flex-row>
        </demo-block>

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
            <flex-row justify="space-between" wrap>
                <flex-col auto>span: auto</flex-col>
                <flex-col><icon type="warn" size="26"/></flex-col>
            </flex-row>
        </demo-block>
    </demo-section>
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
    /deep/ .demo-block {
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
</style>
