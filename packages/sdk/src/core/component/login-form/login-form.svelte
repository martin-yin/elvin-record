<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  function submit() {
    dispatch('loginResult', {
      result: '登录成功了, 哥'
    });
  }
</script>

<div class="login-form">
  <form autocomplete="off">
    <div class="login-form__field">
      <div class="login-form__field-label">账号：</div>
      <div class="login-form__field-value">
        <input placeholder="请输入账号" type="text" />
      </div>
    </div>
    <div class="login-form__field">
      <div class="login-form__field-label">密码：</div>
      <div class="login-form__field-value">
        <input placeholder="请输入密码" type="password" />
      </div>
    </div>
    <div class="button" on:click={submit}>登录</div>
  </form>
</div>

<style scoped lang="less">
  @import './login-form.less';
</style>
