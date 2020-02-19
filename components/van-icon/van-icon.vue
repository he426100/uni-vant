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
        }
    }
</script>
