<template>
    <view :class="classes">
      <view :class="portionClasses" :style="portionStyle">
          <view v-if="showPivot" ref="pivot" :style="pivotStyle" :class="pivotClasses">
            {{text}}
          </view>
      </view>
    </view>
</template>

<script>
    import { isDef } from '@/utils/van-utils/'
    import { stringifyClass } from '@/utils/van-utils/class.js'
    import { BLUE, WHITE } from '@/utils/van-utils/color'
    import useBem from '@/utils/van-utils/use/bem.js'
    
    const bem = useBem('van-progress')
    
    export default {
        props: {
          inactive: Boolean,
          pivotText: String,
          pivotColor: String,
          percentage: {
            type: [Number, String],
            required: true
          },
          showPivot: {
            type: Boolean,
            default: true
          },
          color: {
            type: String,
            default: BLUE
          },
          textColor: {
            type: String,
            default: WHITE
          }
        },
        
        data() {
          return {
            pivotWidth: 0,
            progressWidth: 0,
            Percentage: this.percentage
          };
        },
        
        mounted() {
          this.getWidth();
        },
        
        watch: {
          showPivot() {
            this.getWidth();
          },
        
          pivotText() {
            this.getWidth();
          }
        },
        
        methods: {
          getWidth() {
              //fix percentage
              if (this.Percentage > 100) {
                  this.Percentage = 100
              } else if (this.Percentage < 0) {
                  this.Percentage = 0
              }
              
              //#ifdef H5
              this.progressWidth = this.$el.offsetWidth
              this.pivotWidth = this.$refs.pivot ? this.$refs.pivot.$el.offsetWidth : 0
              //#endif
              //#ifndef H5
              this.progressWidth = this.Percentage + '%'
              //#endif
          }
        },
        
        computed: {
            classes () {
                return stringifyClass(bem())
            },
            portionClasses () {
                return stringifyClass(bem('portion', { 'with-pivot': this.showPivot }))
            },
            pivotClasses () {
                return stringifyClass(bem('pivot'))
            },
            portionStyle () {
                //#ifdef H5
                return {
                  background: this.inactive ? '#cacaca' : this.color,
                  width: ((this.progressWidth - this.pivotWidth) * this.Percentage) / 100 + 'px'
                }
                //#endif
                //#ifndef H5
                return {
                  background: this.inactive ? '#cacaca' : this.color,
                  width: this.progressWidth
                }
                //#endif
            },
            pivotStyle () {
                const background = this.inactive ? '#cacaca' : this.color
                return {
                  color: this.textColor,
                  background: this.pivotColor || background
                }
            },
            text () {
                return isDef(this.pivotText) ? this.pivotText : this.Percentage + '%'
            },
            _showPivot () {
                return this.showPivot && this.text
            }
        }
    }
</script>

<style lang="less">
    @import './index';
</style>
