<template>
    <van-cell :icon="leftIcon" :title="label" :center="center" :border="border" :isLink="isLink" :required="required" :class="classes">
        <view v-if="showLeftIcon" slot="icon" :class="leftIconClasses" @click="onClickLeftIcon">
            <slot name="leftIcon">
                <van-icon :name="leftIcon" />
            </slot>
        </view>
        <template slot="title">
            <slot name="label"></slot>
        </template>
        <view :class="bodyClasses">
            <textarea 
                v-if="type === 'textarea'"
                ref="input"
                :value="value"
                :placeholder="placeholder"
                :placeholderStyle="placeholderStyle"
                :placeholderClass="placeholderClass"
                :disabled="disabled"
                :maxlength="maxlength"
                :focus="focus"
                :autoHeight="autosize"
                :fixed="fixed"
                :cursorSpacing="cursorSpacing"
                :cursor="cursor"
                :showConfirmBar="showConfirmBar"
                :selectionStart="selectionStart"
                :selectionEnd="selectionEnd"
                :adjustPosition="adjustPosition"
                @focus="onFocus"
                @blur="onBlur"
                @linechange="onLinechange"
                @input="onInput"
                @confirm="onConfirm"/>
            <input 
                v-else
                ref="input"
                :type="inputType"
                :password="type === 'password'"
                :value="value"
                :placeholder="placeholder"
                :placeholderStyle="placeholderStyle"
                :placeholderClass="placeholderClass"
                :disabled="disabled"
                :maxlength="maxlength"
                :cursorSpacing="cursorSpacing"
                :focus="focus"
                :confirmType="confirmType"
                :confirmHold="confirmHold"
                :cursor="cursor"
                :selectionStart="selectionStart"
                :selectionEnd="selectionEnd"
                :adjustPosition="adjustPosition"
                @focus="onFocus"
                @blur="onBlur"
                @input="onInput"
                @confirm="onConfirm"/>
            <van-icon v-if="showClear" name="clear" :class="clearClasses" @click.stop="onClear" />
            <view v-if="showRightIcon" :class="rightIconClasses" @click="onClickRightIcon">
                <slot name="rightIcon">
                    <slot name="icon">
                        <van-icon :name="rightIcon || icon" />
                    </slot>
                </slot>
            </view>
            <view v-if="showButton" :class="buttonClasses">
                <slot name="button" />
            </view>
        </view>
        <view v-if="errorMessage" :class="errorMessageClasses">{{errorMessage}}</view>
    </van-cell>
</template>

<script>
    import { stringifyClass } from '@/utils/van-utils/class.js'
    import CellMixin from '@/mixins/van-mixins/cell.js'
    import useBem from '@/utils/van-utils/use/bem.js'

    const bem = useBem('van-field')

    export default {
        inheritAttrs: false,

        mixins: [CellMixin],

        props: {
            error: Boolean,
            leftIcon: String,
            rightIcon: String,
            clearable: Boolean,
            labelAlign: String,
            inputAlign: String,
            onIconClick: Function,
            autosize: [Boolean, Object],
            errorMessage: String,
            placeholder: String,
            placeholderStyle: String,
            placeholderClass: String,
            focus: Boolean,
            fixed: Boolean,
            cursor: Number,
            type: {
                type: String,
                default: 'text'
            },
            disabled: {
              type: [Boolean, String],
              default: false
            },
            maxlength: {
                type: Number,
                default: 140
            },
            cursorSpacing: {
                type: Number,
                default: 0
            },
            showConfirmBar: {
                type: Boolean,
                default: true
            },
            selectionStart: {
                type: Number,
                default: -1
            },
            selectionEnd: {
                type: Number,
                default: -1
            },
            adjustPosition: {
                type: Boolean,
                default: true
            },
            confirmType: {
                type: String,
                default: 'done'
            },
            confirmHold: {
                type: Boolean,
                default: false
            }
        },
        
        data () {
            return {
                isFocus: this.focus
            }
        },
        
        computed: {
            classes() {
                const { labelAlign } = this
                return stringifyClass(bem({
                    error: this.error,
                    disabled: this.disabled,
                    [`label-${labelAlign}`]: labelAlign,
                    'min-height': this.type === 'textarea' && !this.autosize
                }));
            },
            leftIconClasses () {
                return stringifyClass(bem('left-icon'))
            },
            rightIconClasses () {
                return stringifyClass(bem('right-icon'))
            },
            bodyClasses () {
                return stringifyClass(bem('body'))
            },
            buttonClasses () {
                return stringifyClass(bem('button'))
            },
            errorMessageClasses () {
                return stringifyClass(bem('error-message'))
            },
            clearClasses () {
                return stringifyClass(bem('clear'))
            },
            showClear() {
                return this.clearable && this.focus && this.value !== '' && isDef(this.value) && !this.disabled
            },
            showLeftIcon() {
                return this.$slots['left-icon'] || this.leftIcon
            },
            showRightIcon() {
                return this.$slots['right-icon'] || this.$slots.icon || this.rightIcon || this.icon
            },
            inputType () {
                return ['text', 'number', 'idcard', 'digit'].indexOf(this.type) === -1 ? 'text' : this.type
            },
            showButton () {
                return this.$slots.button
            }
        },

        methods: {
            onInput(event) {
                this.$emit('input', event.target.value)
            },
            onFocus(event) {
                this.isFocus = true
                this.$emit('focus', event)
            },
            onBlur(event) {
                this.isFocus = false
                this.$emit('blur', event)
            },
            onConfirm (e) {
                this.$emit('confirm', e)
            },
            onLinechange (e) {
                this.$emit('linechange', e)
            },
            onClickLeftIcon() {
                this.$emit('click-left-icon')
            },
            onClickRightIcon() {
                // compatible old version
                this.$emit('click-icon')
                this.$emit('click-right-icon')
                this.onIconClick && this.onIconClick()
            },
            onClear(event) {
                this.$emit('input', '')
                this.$emit('clear')
            }
        }
    }
</script>

<style lang="less">
    @import './index';
</style>
