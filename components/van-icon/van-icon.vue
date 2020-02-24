<template>
    <view
      :class="[
        classPrefix,
        urlIcon ? 'van-icon--image' : `${classPrefix}-${name}`
      ]"
      :style="{
        color: color,
        fontSize: size
      }"
    >
      <slot></slot>
      <d-img :src="name" v-if="urlIcon"></d-img>
      <van-info :info="info" />
    </view>
</template>

<script>
    import isSrc from '@/utils/van-utils/validate/src.js'
    
    export default {
        props: {
          name: String,
          size: String,
          color: String,
          info: [String, Number],
          classPrefix: {
            type: String,
            default: 'van-icon'
          }
        },
        
        computed: {
            urlIcon () {
                return isSrc(this.name)
            }
        }
    }
</script>
