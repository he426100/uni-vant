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
            :data-id="index"
            :title="tab.title"
            :titleClass="tab.titleClass"
            :disabled="tab.disabled"
            @click.native="onClick(index)"/>
        </view>
      </view>
      <view ref="content" :class="contentClasses" @touchstart="touchStart" @touchmove="touchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
          <view v-if="animated" :class="trackClasses" :style="trackStyle">
            <slot />
          </view>
          <slot v-else />
      </view>
    </view>
</template>

<script>
    import { isDef } from '@/utils/van-utils/index.js'
    import { stringifyClass } from '@/utils/van-utils/class.js'
    import { stringifyStyle } from '@/utils/van-utils/style.js'
    import Touch from '@/mixins/van-mixins/touch.js'
    import useBem from '@/utils/van-utils/use/bem.js'
    
    const bem = useBem('van-tabs')
    
    export default {
        model: {
            prop: 'active'
        },
        mixins: [ Touch ],
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
                this.correctActive(val)
              }
            },
            
            color(val) {
                this.setLine()
            },
            
            childrens(val) {
                this.correctActive(this.curActive || this.active)
                this.setLine()
            },
            
            curActive (val) {
                this.setLine()
            },
            
            sticky() {
              //console.log('sticky: ' + val)
            },
            
            swipeable(val) {
              //console.log('swipeable: ' + JSON.stringify(val))
            }
        },
        
        created () {
            this.navListSize = {}
        },
        
        mounted() {
            this.$nextTick(() => {
                this.inited = true
                this.getNavListSize()
            })
        },

        methods: {
            correctActive(active) {
              active = +active
              const exist = this.childrens.some(tab => tab.index === active)
              const defaultActive = (this.childrens[0] || {}).index || 0
              this.setCurActive(exist ? active : defaultActive)
            },
            setCurActive(active) {
              active = this.findAvailableTab(active, active < this.curActive);
              if (isDef(active) && active !== this.curActive) {
                this.$emit('input', active)
            
                if (this.curActive !== null) {
                  this.$emit('change', active, this.childrens[active].title)
                }
                this.curActive = active
              }
            },
            findAvailableTab(active, reverse) {
              const diff = reverse ? -1 : 1;
              let index = active;
            
              while (index >= 0 && index < this.childrens.length) {
                if (!this.childrens[index].disabled) {
                  return index;
                }
                index += diff;
              }
            },
            onClick(index) {
              const { title, disabled } = this.childrens[index]
              if (disabled) {
                this.$emit('disabled', index, title)
              } else {
                this.setCurActive(index)
                this.$emit('click', index, title)
              }
            },
            getNavListSize() {
                //MP-WEIXIN || H5 || MP-QQ
                uni.createSelectorQuery().in(this).selectAll('.van-tab').boundingClientRect((rects) => {
                    rects.forEach((rect) => {
                        this.navListSize[rect.dataset.id] = rect
                    })
                }).exec();
                            
                setTimeout(this.setLine, 100)
            },
            setLine() {
                const shouldAnimate = this.inited
                this.$nextTick(() => {
                    const currentSize = this.navListSize[this.curActive]
                    if (!currentSize) return
                    
                    const { lineWidth, lineHeight } = this
                    const width = isDef(lineWidth) ? lineWidth : currentSize.width / 2
                    const left = currentSize.left + (currentSize.width - width) / 2
                    
                    const lineStyle = {
                      width: `${width}px`,
                      backgroundColor: this.color,
                      transform: `translateX(${left}px)`
                    };
                    
                    if (shouldAnimate) {
                      lineStyle.transitionDuration = `${this.duration}s`
                    }
                    
                    if (isDef(lineHeight)) {
                      const height = `${lineHeight}px`
                      lineStyle.height = height
                      lineStyle.borderRadius = height
                    }
                    
                    this.lineStyle = lineStyle
                })
            },
            // watch swipe touch end
            onTouchEnd(e) {
              if (!this.swipeable) return
              const { direction, deltaX, curActive } = this;
              const minSwipeDistance = 50;
            
              /* istanbul ignore else */
              if (direction === 'horizontal' && this.offsetX >= minSwipeDistance) {
                /* istanbul ignore else */
                if (deltaX > 0 && curActive !== 0) {
                    this.setCurActive(curActive - 1)
                } else if (deltaX < 0 && curActive !== this.childrens.length - 1) {
                    this.setCurActive(curActive + 1)
                }
              }
            }
        }
    }
</script>

<style lang="less">
    @import './index';
</style>
