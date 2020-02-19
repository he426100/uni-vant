<template>
    <view
      :style="style"
      :class="classes"
    >
      <slot></slot>
    </view>
</template>

<script>
    import useBem from '@/utils/van-utils/use/bem.js'
    
    const bem = useBem('flex-row')
    
    export default {
        props: {
          type: {
              type: String,
              default: 'flex'
          },
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
                const { align, justify, wrap } = this;
                const flex = this.type === 'flex';
                
                return bem({
                    flex,
                    wrap,
                    [`align-${align}`]: flex && align,
                    [`justify-${justify}`]: flex && justify
                })
            },
            
            style () {
                const margin = `-${Number(this.gutter) / 2}px`;
                return this.gutter ? { marginLeft: margin, marginRight: margin } : {}
            }
        }
    }
</script>

<style lang="less">
    @import './index';
</style>
