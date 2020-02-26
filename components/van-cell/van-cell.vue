<template>
    <view @click="onClick" :class="classes">
        <slot name="icon">
            <van-icon v-if="icon" :class="leftIconClasses" :name="icon" />
        </slot>
        <view v-if="showTitle" :class="titleClasses">
            <slot name="title">
              <text>{{title}}</text>
            </slot>
            <view v-if="label" :class="labelClasses">{{label}}</view>
        </view>
        <view v-if="showValue" :class="valueClasses">
            <slot><text>{{value || ''}}</text></slot>
        </view>
        <slot name="rightIcon">
            <van-icon v-if="isLink" :class="rightIconClasses" :name="arrowIcon" />
        </slot>
        <slot name="extra"></slot>
    </view>
</template>

<script>
    import { stringifyClass } from '@/utils/van-utils/class.js'
    import { isDef } from '@/utils/van-utils/'
    import CellMixin from '@/mixins/van-mixins/cell.js'
    import RouterLink from '@/mixins/van-mixins/router-link.js'
    import useBem from '@/utils/van-utils/use/bem.js'

    const bem = useBem('van-cell')

    export default {
        mixins: [CellMixin, RouterLink],
        props: {
          size: String,
          clickable: Boolean,
          arrowDirection: String
        },
        computed: {
          classes () {
              return stringifyClass(bem({
                center: this.center,
                required: this.required,
                borderless: !this.border,
                clickable: this.isLink || this.clickable,
                [this.size]: this.size
              }))
          },
          leftIconClasses () {
              return stringifyClass(bem('left-icon'))
          },
          titleClasses () {
              return stringifyClass([bem('title'), this.titleClass])
          },
          valueClasses () {
              return stringifyClass([bem('value', { alone: !this.$slots.title && !this.title }), this.valueClass])
          },
          rightIconClasses () {
              return stringifyClass(bem('right-icon'))
          },
          showTitle () {
            return this.$slots.title || isDef(this.title)
          },
          showValue () {
            return this.$slots.default || isDef(this.value)
          },
          arrowIcon () {
              return this.arrowDirection ? `arrow-${this.arrowDirection}` : 'arrow'
          },
          labelClasses () {
              return stringifyClass([bem('label'), this.labelClass])
          }
        },
        methods: {
            onClick() {
              this.$emit('click')
              this.routerLink()
            }
        }
    }
</script>

<style lang="less">
    @import './index';
</style>
