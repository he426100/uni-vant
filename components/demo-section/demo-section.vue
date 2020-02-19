<template>
    <view :class="classes"><slot></slot></view>
</template>

<script>
    import useBem from '@/utils/van-utils/use/bem.js'
    
    const bem = useBem('demo-section')
    
    export default {
        computed: {
            classes () {
                return bem()
            }
        }
    }
</script>

<style lang="less">
    @import './index';
</style>
