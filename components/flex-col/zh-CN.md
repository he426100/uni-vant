## Flex-Layout 布局

提供了`flex-row`和`flex-col`两个组件来进行行列布局

### 使用指南

- 遵守easycom规范，可无需注册直接使用
- 仅支持H5和App
- 修改自vant-layout

### 代码演示

#### 基本用法

Layout 组件提供了`24列栅格`，通过在`Col`上添加`span`属性设置列所占的宽度百分比    
此外，添加`offset`属性可以设置列的偏移宽度，计算方式与 span 相同

```html
<flex-row>
  <flex-col span="8">span: 8</flex-col>
  <flex-col span="8">span: 8</flex-col>
  <flex-col span="8">span: 8</flex-col>
</flex-row>

<flex-row>
  <flex-col span="4">span: 4</flex-col>
  <flex-col span="10" offset="4">offset: 4, span: 10</flex-col>
</flex-row>

<flex-row>
  <flex-col offset="12" span="12">offset: 12, span: 12</flex-col>
</flex-row>
```

#### 设置列元素间距

通过`gutter`属性可以设置列元素之间的间距，默认间距为 0

```html
<flex-row gutter="20">
  <flex-col span="8">span: 8</flex-col>
  <flex-col span="8">span: 8</flex-col>
  <flex-col span="8">span: 8</flex-col>
</flex-row>
```

#### Flex 布局

将 `type` 属性设置为 flex 可以启用 flex 布局，便于进行灵活的对齐

```html
<!-- 左对齐 -->
<flex-row type="flex">
  <flex-col span="6">span: 6</flex-col>
  <flex-col span="6">span: 6</flex-col>
  <flex-col span="6">span: 6</flex-col>
</flex-row>

<!-- 居中 -->
<flex-row type="flex" justify="center">
  <flex-col span="6">span: 6</flex-col>
  <flex-col span="6">span: 6</flex-col>
  <flex-col span="6">span: 6</flex-col>
</flex-row>

<!-- 右对齐 -->
<flex-row type="flex" justify="end">
  <flex-col span="6">span: 6</flex-col>
  <flex-col span="6">span: 6</flex-col>
  <flex-col span="6">span: 6</flex-col>
</flex-row>

<!-- 两端对齐 -->
<flex-row type="flex" justify="space-between">
  <flex-col span="6">span: 6</flex-col>
  <flex-col span="6">span: 6</flex-col>
  <flex-col span="6">span: 6</flex-col>
</flex-row>

<!-- 每个元素的两侧间隔相等 -->
<flex-row type="flex" justify="space-around">
  <flex-col span="6">span: 6</flex-col>
  <flex-col span="6">span: 6</flex-col>
  <flex-col span="6">span: 6</flex-col>
</flex-row>
```

### 列表页两列布局

```
<flex-row justify="space-between" wrap>
    <flex-col :span="12" class="plr10"></flex-col>
    <flex-col :span="12" class="plr10"></flex-col>
    <flex-col :span="12" class="plr10"></flex-col>
    ...
</flex-row>

.plr10 {
    padding-left: 5px;
    padding-right: 5px
}
```

### 代替float实现图标浮动到右侧

```
<flex-row>
    <flex-col auto>标题</flex-col>
    <text class="icon iconfont icon-xxx"></text>
</flex-row>
```

### API

#### Row

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| type | 布局方式，固定值`flex` | `String` | - | 1.1.9 |
| gutter | 列元素之间的间距（单位为px） | `String | Number` | - | - |
| justify | Flex 主轴对齐方式，可选值为 `end` `center` <br> `space-around` `space-between` | `String` | `start` | 1.1.9  |
| align | Flex 交叉轴对齐方式，可选值为 `center` `bottom` | `String` | `top` | 1.1.9 |
| wrap | 列元素是否换行 | `Boolean` | - | - |

#### Col

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| span | 列元素宽度 | `String | Number` | - | - |
| offset | 列元素偏移距离 | `String | Number` | - | - |
| auto | flex: auto | `Boolean` | - | - |