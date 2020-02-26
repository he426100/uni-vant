<template>
    <view :class="classes">
      <view
        ref="wrap"
        :style="wrapStyle"
        :class="wrapClasses"
      >
        <view ref="nav" :class="navClasses" :style="navStyle">
          <view v-if="type === 'line'" :class="lineClasses" :style="lineStyle" />
          <van-tab-nav
            v-for="(tab, index) in childrens" :key="index"
            :index="index"
            :title="tab.title"
            :titleClass="tab.titleClass"
            :disabled="tab.disabled"
            @click.native="onClick(index)" />
        </view>
      </view>
      <view ref="content" :class="contentClasses">
          <view v-if="animated" :class="trackClasses" :style="trackStyle">
            <slot />
          </view>
          <slot v-else />
      </view>
    </view>
</template>

<script>
    import { stringifyClass } from '@/utils/van-utils/class.js'
    import { stringifyStyle } from '@/utils/van-utils/style.js'
    import useBem from '@/utils/van-utils/use/bem.js'
    
    const bem = useBem('van-tabs')
    
    export default {
        props: {
            color: String,
            sticky: Boolean,
            animated: Boolean,
            offsetTop: Number,
            swipeable: Boolean,
            ellipsis: {
              type: Boolean,
              default: true
            },
            lineWidth: {
              type: Number,
              default: null
            },
            lineHeight: {
              type: Number,
              default: null
            },
            active: {
              type: [Number, String],
              default: 0
            },
            type: {
              type: String,
              default: 'line'
            },
            duration: {
              type: Number,
              default: 0.3
            },
            swipeThreshold: {
              type: Number,
              default: 4
            }
        },
        
        provide() {
        	return {
        		tabs: this
        	}
        },
        
        data() {
          return {
            position: '',
            curActive: this.active,
            lineStyle: {
              backgroundColor: this.color
            },
            childrens: []
          };
        },
        
        computed: {
            classes () {
                const { type } = this
                return stringifyClass(bem([type]))
            },
            wrapClasses () {
                const { type, scrollable } = this
                return stringifyClass([bem('wrap', { scrollable }), { 'van-hairline--top-bottom': type === 'line' }])
            },
            navClasses () {
                const { type } = this
                return stringifyClass(bem('nav', [type]))
            },
            lineClasses () {
                return stringifyClass(bem('line'))
            },
            contentClasses () {
                const { animated } = this
                return stringifyClass(bem('content', { animated }))
            },
            trackClasses () {
                return stringifyClass(bem('track'))
            },
            // whether the nav is scrollable
            scrollable() {
              return this.childrens.length > this.swipeThreshold || !this.ellipsis;
            },
            wrapStyle() {
              switch (this.position) {
                case 'top':
                  return stringifyStyle({
                    top: this.offsetTop + 'px',
                    position: 'fixed'
                  })
                case 'bottom':
                  return stringifyStyle({
                    top: 'auto',
                    bottom: 0
                  })
                default:
                  return ''
              }
            },
            
            navStyle() {
              return stringifyStyle({
                borderColor: this.color
              })
            },
            
            trackStyle() {
              if (this.animated) {
                return stringifyStyle({
                  left: `${-1 * this.curActive * 100}%`,
                  transitionDuration: `${this.duration}s`
                })
              }
            }
        },
        
        watch: {
            active(val) {
              if (val !== this.curActive) {
                //console.log('val !== curActive')
              }
            },
            
            color(val) {
                //console.log('color: ' + val)
            },
            
            childrens(val) {
                //console.log('childrens: ' + (val ? val.length : 0))
            },
            
            curActive (val) {
                //console.log('curActive: ' + val)
            },
            
            sticky() {
              //console.log('sticky: ' + val)
            },
            
            swipeable(val) {
              //console.log('swipeable: ' + JSON.stringify(val))
            }
        },
        
        methods: {
            onClick(index) {
              const { title, disabled } = this.childrens[index]
              if (disabled) {
                this.$emit('disabled', index, title)
              } else {
                this.curActive = index
                this.$emit('input', this.curActive)
                this.$emit('click', index, title)
                this.$emit('change', index, title)
              }
            },
        }
    }
</script>

<style lang="less">
    @import './index';
</style>
