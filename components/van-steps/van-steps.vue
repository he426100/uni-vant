<template>
    <view :class="classes">
        <view v-if="(title || description)" :class="statusClasses">
          <view v-if="showIcon" :class="iconClasses">
              <slot name="icon">
                  <van-icon :name="icon" :class="iconClass" />
              </slot>
          </view>
          <view :class="messageClasses">
            <view :class="titleClasses">{{title}}</view>
            <view :class="descriptionClasses">{description}</view>
          </view>
          <slot name="messageExtra"></slot>
        </view>
        <view :class="defaultClasses"><slot /></view>
    </view>
</template>

<script>
    import { stringifyClass } from '@/utils/van-utils/class.js'
    import { GREEN } from '@/utils/van-utils/color'
    import useBem from '@/utils/van-utils/use/bem.js'
    
    const bem = useBem('van-steps')
    
    export default {
        props: {
          icon: String,
          title: String,
          active: {
              type: Number,
              default: 0
          },
          iconClass: String,
          description: String,
          direction: {
              type: String,
              default: "horizontal"
          },
          activeColor: {
              type: String,
              default: "#07c160"
          },
          activeIcon: {
              type: String,
              default: "checked"
          }
        },
        
        provide() {
        	return {
        		steps: this
        	}
        },
        
        created() {
        	this.childrens = []
        },
        
        computed: {
            classes () {
                return stringifyClass(bem([this.direction]))
            },
            statusClasses () {
                return stringifyClass(bem('status'))
            },
            iconClasses () {
                return stringifyClass(bem('icon'))
            },
            showIcon () {
                return this.$slots.icon || this.icon
            },
            messageClasses () {
                return stringifyClass(bem('message'))
            },
            titleClasses () {
                return stringifyClass(bem('title'))
            },
            descriptionClasses () {
                return stringifyClass([bem('desc'), 'van-ellipsis'])
            },
            defaultClasses () {
                return stringifyClass(bem('items', { alone: !this.title && !this.description }))
            }
        }
    }
</script>

<style lang="less">
    @import './index';
</style>
