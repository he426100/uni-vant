<template>
    <view v-if="isInfo" :class="classes">
      {{info}}
    </view>
</template>

<script>
    import { isDef } from '@/utils/van-utils/'
    import useBem from '@/utils/van-utils/use/bem.js'
    
    const bem = useBem('van-info')
    
    export default {
        props: {
          info: [String, Number]
        },
        computed: {
            classes () {
                return bem()
            },
            isInfo () {
                return isDef(this.info)
            }
        }
    }
</script>
