<template>
    <button
        @click.stop="onBtnClick"
        :disabled="disabled"
        :loading="loading"
        :size="uniSize"
        :type="uniType"
        :plain="uniPlain"
        :form-type="formType"
        :open-type="openType"
        :hover-class="hoverClass"
        :hover-start-time="hoverStartTime"
        :hover-stay-time="hoverStayTime"
        :class="btnClasses">
      <view :class="textClasses"><slot>{{text}}</slot></view>
    </button>
</template>

<script>
    import { stringifyClass } from '@/utils/van-utils/class.js'
    import useBem from '@/utils/van-utils/use/bem.js'
    
    const bem = useBem('van-button')

    export default {
        props: {
          text: String,
          block: Boolean,
          plain: Boolean,
          round: Boolean,
          square: Boolean,
          loading: {
            type: [Boolean, String],
            default: false
          },
          disabled: {
            type: [Boolean, String],
            default: false
          },
          bottomAction: Boolean,
          tag: {
            type: String,
            default: 'button'
          },
          type: {
            type: String,
            default: 'default'
          },
          size: {
            type: String,
            default: 'normal'
          },
          uniType: String,
          uniSize: String,
          uniPlain: Boolean,
          formType: String,
          openType: String,
          hoverClass: String,
          hoverStartTime: Number,
          hoverStayTime: Number
        },
        computed: {
            btnClasses () {
                return stringifyClass(bem([
                    this.type,
                    this.size,
                    {
                      loading: this.loading,
                      disabled: this.disabled,
                      block: this.block,
                      plain: this.plain,
                      round: this.round,
                      square: this.square,
                      'bottom-action': this.bottomAction
                    }
                ]))
            },
            textClasses () {
                return stringifyClass(bem('text'))
            }
        },
        methods: {
            onBtnClick () {
                if (!this.loading && !this.disabled) {
                  this.$emit('click')
                }
            }
        }
    }
</script>

<style lang="less">
    @import './index';
</style>
