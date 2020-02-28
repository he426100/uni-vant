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
      <view ref="content" :class="contentClasses">
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
    import useBem from '@/utils/van-utils/use/bem.js'
    
    const bem = useBem('van-tabs')
    
    export default {
        model: {
            prop: 'active'
        },
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
              this.curActive = val
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
            onClick(index) {
              const oldIndex = this.curActive
              const { title, disabled } = this.childrens[index]
              if (disabled) {
                this.$emit('disabled', index, title)
              } else {
                this.curActive = index
                this.$emit('input', index)
                this.$emit('click', index, title)
                if (oldIndex != index) {
                    this.$emit('change', index, title) //先用input事件改变v-modal的值，再触发change事件
                }
                /* update nav */
                const currentSize = this.navListSize[index]
                currentSize && this.setLine(currentSize.left, currentSize.width)
              }
            },
            getNavListSize(index) {
                //MP-WEIXIN || H5 || MP-QQ
                uni.createSelectorQuery().in(this).selectAll('.van-tab').boundingClientRect((rects) => {
                    rects.forEach((rect) => {
                        this.navListSize[rect.dataset.id] = rect
                    })
                }).exec();
                            
                setTimeout(() => {
                    this.navListSize[this.curActive] && this.setLine(this.navListSize[this.curActive].left, this.navListSize[this.curActive].width);
                }, 100)
            },
            setLine(navLeft, navWidth) {
                const shouldAnimate = this.inited
                this.$nextTick(() => {
                    const { lineWidth, lineHeight } = this
                    const width = isDef(lineWidth) ? lineWidth : navWidth / 2
                    const left = navLeft + (navWidth - width) / 2
                    
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
            }
        }
    }
</script>

<style lang="less">
    @import './index';
</style>
