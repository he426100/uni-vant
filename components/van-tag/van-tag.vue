<template>
    <view
      :style="tagStyle"
      :class="classes"
    >
      <slot />
    </view>
</template>

<script>
    import { RED, BLUE, GREEN, GRAY_DARK } from '@/utils/van-utils/color.js'
    import { stringifyClass } from '@/utils/van-utils/class.js'
    import { stringifyStyle } from '@/utils/van-utils/style.js'
    import useBem from '@/utils/van-utils/use/bem.js'
    
    const COLOR_MAP = {
      danger: RED,
      primary: BLUE,
      success: GREEN
    }
    
    const bem = useBem('van-tag')
    
    export default {
        props: {
          size: String,
          type: String,
          mark: Boolean,
          color: String,
          plain: Boolean,
          round: Boolean,
          textColor: String
        },
        
        computed: {
            tagStyle () {
                const color = this.color || COLOR_MAP[this.type] || GRAY_DARK
                const key = this.plain ? 'color' : 'backgroundColor'
                return stringifyStyle({ [key]: color })
            },
            classes () {
                const { mark, plain, round, size } = this
                return stringifyClass([
                    bem({ mark, plain, round, [size]: size }),
                    {
                      'van-hairline--surround': plain
                    }
                ])
            }
        }
    }
</script>

<style lang="less">
    @import './index';
</style>
