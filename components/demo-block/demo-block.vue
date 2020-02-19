<template>
    <view :class="classes">
        <view :class="titleClasses">{{title}}</view>
        <slot></slot>
    </view>
</template>

<script>
    import useBem from '@/utils/van-utils/use/bem.js'
    
    const bem = useBem('demo-block')
    
    export default {
        props: {
            titleClass: String,
            title: [String, Number]
        },
        computed: {
            classes () {
                return bem()
            },
            titleClasses () {
                return [bem('title'), this.titleClass]
            },
        }
    }
</script>

<style lang="less">
    @import './index';
</style>
