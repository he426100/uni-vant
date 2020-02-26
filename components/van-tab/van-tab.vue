<template>
    <view @click="onClick" v-show="selected || animated" :class="classes">
      <slot />
    </view>
</template>

<script>
    import { stringifyClass } from '@/utils/van-utils/class.js'
    import { stringifyStyle } from '@/utils/van-utils/style.js'
    import useBem from '@/utils/van-utils/use/bem.js'
    
    const bem = useBem('van-tab')
    
    export default {
        props: {
            title: String,
            titleClass: String,
            disabled: Boolean
        },
        
        inject: ['tabs'],
        
        data () {
            return {
                index: -1
            }
        },
        
        created() {
            this.index = this.tabs.childrens.length
            this.tabs.childrens.push(this)
        },
        
        computed: {
            animated () {
                return this.tabs.animated
            },
            
            showTitle () {
                return this.$slots.title
            },
            
            classes () {
                return stringifyClass(bem('pane'))
            },

            selected() {
                return this.index === this.tabs.curActive
            }
        },
        
        methods: {
            onClick () {
                this.$emit('content-click', this.index)
            }
        }
    }
</script>
