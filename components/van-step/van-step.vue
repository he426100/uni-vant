<template>
    <view :class="classes">
      <view :class="titleClasses" :style="titleStyle">
        <slot />
      </view>
      <view :class="containerClasses">
          <text v-if="status !== 'process'" :class="circleClasses" />
          <van-icon v-else :name="iconName" :style="iconStyle" />
      </view>
      <view :class="lineClasses" />
    </view>
</template>

<script>
    import { stringifyClass } from '@/utils/van-utils/class.js'
    import { stringifyStyle } from '@/utils/van-utils/style.js'
    import useBem from '@/utils/van-utils/use/bem.js'
    
    const bem = useBem('van-step')
    
    export default {
        inject: ['steps'],
        created() {
          this.steps.childrens.push(this)
        },
        
        computed: {
          status() {
            const index = this.steps.childrens.indexOf(this);
            const { active } = this.steps;
        
            if (index < active) {
              return 'finish';
            }
            if (index === active) {
              return 'process';
            }
          },
          classes () {
              const { status } = this
              const { direction } = this.steps
              return stringifyClass(['van-hairline', bem([direction, { [status]: status }])])
          },
          titleStyle () {
              const { activeColor } = this.steps
              return stringifyStyle(this.status === 'process' && { color: activeColor })
          },
          titleClasses () {
              return stringifyClass(bem('title'))
          },
          containerClasses () {
              return stringifyClass(bem('circle-container'))
          },
          circleClasses () {
              return stringifyClass(bem('circle'))
          },
          iconStyle () {
              const { activeColor } = this.steps
              return stringifyStyle({ color: activeColor })
          },
          lineClasses () {
              return stringifyClass(bem('line'))
          },
          iconName () {
              return this.steps.activeIcon || 'checked'
          }
        },
    }
</script>

<style lang="less">
    @import './index';
</style>
