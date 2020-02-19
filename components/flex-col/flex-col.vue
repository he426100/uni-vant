<template>
    <view :class="classes" :style="style">
      <slot></slot>
    </view>
</template>

<script>
    import useBem from '@/utils/van-utils/use/bem.js'
    
    const bem = useBem('flex-col')
    
    export default {
        props: {
          span: [Number, String],
          offset: [Number, String],
          auto: Boolean
        },
        
        computed: {
          gutter() {
              if (this.row.gutter) {
                  console.log('在这里')
              }
            return (this.row && Number(this.row.gutter)) || 0;
          },
        
          style() {
            const padding = `${this.gutter / 2}px`;
            return this.gutter ? { paddingLeft: padding, paddingRight: padding } : {};
          },
          
          classes () {
              const { span, offset, auto } = this
              return bem({ [span]: span, auto, [`offset-${offset}`]: offset })
          }
        },
        
        inject: ['row'],
    }
</script>

<style lang="less">
    @import './index';
</style>
