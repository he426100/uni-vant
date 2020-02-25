<template>
    <view class="demo-field">
      <demo-section>
        <demo-block title="基础用法">
          <van-cell-group>
            <van-field
              v-model="value"
              placeholder="请输入用户名"
            />
          </van-cell-group>
        </demo-block>

        <demo-block title="自定义类型">
          <van-cell-group>
            <van-field
              v-model="username"
              label="用户名"
              placeholder="请输入用户名"
              clearable
              right-icon="question-o"
              required
              @click-right-icon="$showMsg('question')"
            />

            <van-field
              v-model="password"
              type="password"
              label="密码"
              placeholder="请输入密码"
              required
            />
          </van-cell-group>
        </demo-block>

        <demo-block title="禁用输入框">
          <van-cell-group>
            <van-field
              value="输入框已禁用"
              label="用户名"
              left-icon="contact"
              disabled
            />
          </van-cell-group>
        </demo-block>

        <demo-block title="错误提示">
          <van-cell-group>
            <van-field
              v-model="username2"
              label="用户名"
              placeholder="请输入用户名"
              error
            />
            <van-field
              v-model="phone"
              label="手机号"
              placeholder="请输入手机号"
              error-message="手机号格式错误"
            />
          </van-cell-group>
        </demo-block>

        <demo-block title="高度自适应">
          <van-cell-group>
            <van-field
              v-model="message"
              label="留言"
              type="textarea"
              placeholder="请输入留言"
              rows="1"
              autosize
            />
          </van-cell-group>
        </demo-block>

        <demo-block title="插入按钮">
          <van-cell-group>
            <van-field
              center
              clearable
              v-model="sms"
              label="短信验证码"
              placeholder="请输入短信验证码"
            >
              <van-button
                slot="button"
                size="small"
                type="primary"
              >
                发送验证码
              </van-button>
            </van-field>
          </van-cell-group>
        </demo-block>
      </demo-section>
    </view>
</template>

<script>
	export default {
		data() {
			return {
				sms: '',
				value: '',
				password: '',
				username: '',
				username2: '',
				message: '',
				phone: '1365577'
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
@import '../../components/van-style/var';

.demo-field {
  padding-bottom: 30px;

  /deep/ .van-field__right-icon .van-icon {
    color: @blue;
  }
}
</style>
