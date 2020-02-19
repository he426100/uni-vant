<template>
    <view
      :style="style"
      :class="classes"
    >
      <slot></slot>
    </view>
</template>

<script>
    import { stringifyClass } from '@/utils/van-utils/class.js'
    import { stringifyStyle } from '@/utils/van-utils/style.js'
    import useBem from '@/utils/van-utils/use/bem.js'
    
    const bem = useBem('flex-row')
    
    export default {
        props: {
          //#ifndef MP-WEIXIN
          type: {
              type: String,
              default: 'flex'
          },
          //#endif
          //#ifdef MP-WEIXIN
          type: String,
          customClass: String,
          //#endif
          align: String,
          justify: String,
          wrap: Boolean,
          gutter: {
            type: [Number, String],
            default: 0
          }
        },
        
        computed: {
            classes () {
                const { align, justify, wrap } = this
                const flex = this.type === 'flex'
                let _classes = bem({
                    flex,
                    wrap,
                    [`align-${align}`]: flex && align,
                    [`justify-${justify}`]: flex && justify
                })
                if (this.customClass) {
                  _classes.push(this.customClass)
                }
                return stringifyClass(_classes)
            },
            
            style () {
                const margin = `-${Number(this.gutter) / 2}px`;
                return stringifyStyle(this.gutter ? { marginLeft: margin, marginRight: margin } : {})
            }
        },
        
        provide() {
        	return {
        		row: this
        	}
        },
    }
</script>

<style lang="less">
    @import './index';
</style>
