<template>
    <view :class="classes">
        <slot />
    </view>
</template>

<script>
    import { stringifyClass } from '@/utils/van-utils/class.js'
    import useBem from '@/utils/van-utils/use/bem.js'
    
    const bem = useBem('van-cell-group')

    export default {
        props: {
          border: {
            type: Boolean,
            default: true
          }
        },
        computed: {
            classes () {
                return stringifyClass([bem(), { 'van-hairline--top-bottom': this.border }])
            }
        }
    }
</script>

<style lang="less">
    @import './index';
</style>
