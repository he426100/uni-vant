<template>
    <view @click="onClick" :class="classes">
        <slot name="icon">
            <van-icon v-if="icon" :class="leftIconClasses" :name="icon" />
        </slot>
        <slot v-if="showTitle" name="title">
            <view :class="titleClasses">
              <text>{{title}}</text>
              <view v-if="label" class="[bem('label'), labelClass]">{{label}}</view>
            </view>
        </slot>
        <slot v-if="showValue" name="value">
            <view :class="valueClasses">
              <slot><text>{{value || ''}}</text></slot>
            </view>
        </slot>
        <slot name="rightIcon">
            <van-icon v-if="isLink" :class="rightIconClasses" :name="arrowIcon" />
        </slot>
        <slot name="extra"></slot>
    </view>
</template>

<script>
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
              return bem({
                center: this.center,
                required: this.required,
                borderless: !this.border,
                clickable: this.isLink || this.clickable,
                [this.size]: this.size
              })
          },
          leftIconClasses () {
              return bem('left-icon')
          },
          titleClasses () {
              return [bem('title'), this.titleClass]
          },
          valueClasses () {
              return [bem('value', { alone: !this.$slots.title && !this.title }), this.valueClass]
          },
          rightIconClasses () {
              return bem('right-icon')
          },
          showTitle () {
            return this.$slots.title || isDef(this.title)
          },
          showValue () {
            return this.$slots.default || isDef(this.value)
          },
          arrowIcon () {
              return this.arrowDirection ? `arrow-${this.arrowDirection}` : 'arrow'
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
