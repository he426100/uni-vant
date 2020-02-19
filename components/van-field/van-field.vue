<template>
    <Cell
      :icon="leftIcon"
      :title="label"
      :center="center"
      :border="border"
      :isLink="isLink"
      :required="required"
      :class="bem({
        error: error,
        disabled: disabled,
        [`label-${labelAlign}`]: labelAlign,
        'min-height': type === 'textarea' && !autosize
      })"
    >
      <slot name="leftIcon">
          <view v-if="showLeftIcon" slot="icon" :class="bem('left-icon')" :onClick="onClickLeftIcon">
            <van-icon name="leftIcon" />
          </view>
      </slot>
      <!-- 待实现 -->
    </Cell>
</template>

<script>
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
          readonly: Boolean,
          clearable: Boolean,
          labelAlign: String,
          inputAlign: String,
          onIconClick: Function,
          autosize: [Boolean, Object],
          errorMessage: String,
          type: {
            type: String,
            default: 'text'
          }
        },
        
        data() {
          return {
            focused: false
          };
        },
        
        watch: {
          value() {
            this.$nextTick(this.adjustSize);
          }
        },
        
        mounted() {
          this.format();
          this.$nextTick(this.adjustSize);
        },
        
        computed: {
          showClear() {
            return (
              this.clearable && this.focused && this.value !== '' && isDef(this.value) && !this.readonly
            );
          },
        
          listeners() {
            return {
              ...this.$listeners,
              input: this.onInput,
              keypress: this.onKeypress,
              focus: this.onFocus,
              blur: this.onBlur
            };
          },
          
          showLeftIcon () {
            return this.$slots['left-icon'] || this.leftIcon
          },
          
          showRightIcon () {
              return this.$slots['right-icon'] || this.$slots.icon || this.rightIcon || this.icon
          }
        },
        
        methods: {
          focus() {
            this.$refs.input && this.$refs.input.focus();
          },
        
          blur() {
            this.$refs.input && this.$refs.input.blur();
          },
        
          // native maxlength not work when type = number
          format(target = this.$refs.input) {
            let { value } = target;
            const { maxlength } = this.$attrs;
        
            if (this.type === 'number' && isDef(maxlength) && value.length > maxlength) {
              value = value.slice(0, maxlength);
              target.value = value;
            }
        
            return value;
          },
        
          onInput(event) {
            this.$emit('input', this.format(event.target));
          },
        
          onFocus(event) {
            this.focused = true;
            this.$emit('focus', event);
        
            // hack for safari
            /* istanbul ignore if */
            if (this.readonly) {
              this.blur();
            }
          },
        
          onBlur(event) {
            this.focused = false;
            this.$emit('blur', event);
          },
        
          onClickLeftIcon() {
            this.$emit('click-left-icon');
          },
        
          onClickRightIcon() {
            // compatible old version
            this.$emit('click-icon');
            this.$emit('click-right-icon');
            this.onIconClick && this.onIconClick();
          },
        
          onClear(event) {
            event.preventDefault();
            this.$emit('input', '');
            this.$emit('clear');
          },
        
          onKeypress(event) {
            if (this.type === 'number') {
              const { keyCode } = event;
              const allowPoint = String(this.value).indexOf('.') === -1;
              const isValidKey =
                (keyCode >= 48 && keyCode <= 57) || (keyCode === 46 && allowPoint) || keyCode === 45;
              if (!isValidKey) {
                event.preventDefault();
              }
            }
        
            // trigger blur after click keyboard search button
            /* istanbul ignore next */
            if (this.type === 'search' && event.keyCode === 13) {
              this.blur();
            }
        
            this.$emit('keypress', event);
          },
        
          adjustSize() {
            const { input } = this.$refs;
            if (!(this.type === 'textarea' && this.autosize) || !input) {
              return;
            }
        
            input.style.height = 'auto';
        
            let height = input.scrollHeight;
            if (isObj(this.autosize)) {
              const { maxHeight, minHeight } = this.autosize;
              if (maxHeight) {
                height = Math.min(height, maxHeight);
              }
              if (minHeight) {
                height = Math.max(height, minHeight);
              }
            }
        
            if (height) {
              input.style.height = height + 'px';
            }
          }
        },
    }
</script>
