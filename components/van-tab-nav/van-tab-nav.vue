<template>
    <view @click="onClick" :class="classes" :style="tabStyle">
      <text :class="ellipsisClasses">{{title}}</text>
    </view>
</template>

<script>
    import { isDef } from '@/utils/van-utils/'
    import { stringifyClass } from '@/utils/van-utils/class.js'
    import { stringifyStyle } from '@/utils/van-utils/style.js'
    import useBem from '@/utils/van-utils/use/bem.js'
    
    const bem = useBem('van-tab')
    
    export default {
        props: {
            index: Number,
            title: String,
            titleClass: String,
            disabled: Boolean
        },
        
        inject: ['tabs'],
        
        computed: {
            classes () {
                const { ellipsis } = this.tabs
                return stringifyClass(bem({
                  active: this.selected,
                  disabled: this.disabled,
                  complete: !ellipsis
                }))
            },
            
            ellipsisClasses () {
                const { ellipsis } = this.tabs
                return isDef(this.titleClass) ? stringifyClass(this.titleClass) : stringifyClass({ 'van-ellipsis': ellipsis })
            },
            
            tabStyle () {
                const style = {}
                const { color, type } = this.tabs
                const active = this.selected
                const isCard = type === 'card'
                
                if (color) {
                  if (!this.disabled && isCard && !active) {
                    style.color = color
                  }
                  if (!this.disabled && isCard && active) {
                    style.backgroundColor = color
                  }
                  if (isCard) {
                    style.borderColor = color
                  }
                }
                
                if (this.scrollable && this.ellipsis) {
                  style.flexBasis = 88 / this.swipeThreshold + '%'
                }
                
                return stringifyStyle(style)
            },

            selected() {
                return this.index === this.tabs.curActive
            }
        },
        
        methods: {
            onClick () {
                this.$emit('nav-click', this.index)
            }
        }
    }
</script>
