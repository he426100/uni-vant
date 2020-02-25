<template>
    <view :class="classes">
        <view :class="titleClasses">{{title}}</view>
        <slot></slot>
    </view>
</template>

<script>
    import { stringifyClass } from '@/utils/van-utils/class.js'
    import useBem from '@/utils/van-utils/use/bem.js'
    
    const bem = useBem('demo-block')
    
    export default {
        props: {
            titleClass: String,
            title: [String, Number]
        },
        computed: {
            classes () {
                return stringifyClass(bem())
            },
            titleClasses () {
                return stringifyClass([bem('title'), this.titleClass])
            },
        }
    }
</script>

<style lang="less">
    @import './index';
</style>
