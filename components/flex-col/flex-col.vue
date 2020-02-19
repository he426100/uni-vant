<template>
    <view :class="classes" :style="style">
      <slot></slot>
    </view>
</template>

<script>
    import { stringifyClass } from '@/utils/van-utils/class.js'
    import { stringifyStyle } from '@/utils/van-utils/style.js'
    import useBem from '@/utils/van-utils/use/bem.js'
    
    const bem = useBem('flex-col')
    
    export default {
        props: {
          //#ifdef MP-WEIXIN
          customClass: String,
          //#endif
          span: [Number, String],
          offset: [Number, String],
          auto: Boolean
        },
        
        computed: {
          gutter() {
            return (this.row && Number(this.row.gutter)) || 0
          },
        
          style() {
            const padding = `${this.gutter / 2}px`
            return stringifyStyle(this.gutter ? { paddingLeft: padding, paddingRight: padding } : {})
          },
          
          classes () {
              const { span, offset, auto } = this
              let _classes = bem({ [span]: span, auto, [`offset-${offset}`]: offset })
              if (this.customClass) {
                _classes.push(this.customClass)
              }
              return stringifyClass(_classes)
          }
        },
        
        inject: ['row'],
    }
</script>

<style lang="less">
    @import './index';
</style>
