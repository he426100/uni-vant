<template>
    <view :class="classes">
        <slot />
    </view>
</template>

<script>
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
                return [bem(), { 'van-hairline--top-bottom': this.border }]
            }
        }
    }
</script>
