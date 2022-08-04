<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import LoginForm from './login-form/login-form.svelte';

  function isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  const dispatch = createEventDispatcher();

  let isLogin = false;
  let show = false;
  let showSwitchButton = true;

  let mobile = isMobile();

  let showMask = false;
  let showMain = false;
  let showPanel = false;

  let fontSize = '';

  function handleLoginResult(event: any) {
    console.log(event.detail);

    if (event.detail.result === '登录成功了, 哥') {
      isLogin = true;
    }
  }

  $: {
    if (show === true) {
      showMain = true;
      showPanel = true;
      showMask = true;
    } else {
      showMain = false;
      showPanel = false;
      showMask = false;
    }
  }

  onMount(() => {
    const viewportEl = document.querySelectorAll('[name="viewport"]');
    if (viewportEl && viewportEl[0]) {
      const viewportContent = viewportEl[viewportEl.length - 1].getAttribute('content') || '';
      const initialScale = viewportContent.match(/initial\-scale\=\d+(\.\d+)?/);
      const scale = initialScale ? parseFloat(initialScale[0].split('=')[1]) : 1;
      if (scale !== 1) {
        fontSize = Math.floor((1 / scale) * 16) + 'px';
      }
    }
  });

  const onTapEventShow = (e: any) => {
    show = true;
    dispatch('show', { show: true });
  };

  const onTapEventHide = (e: any) => {
    show = false;
    dispatch('show', { show: false });
  };
</script>

<main>
  <div
    style={fontSize ? 'font-size:' + fontSize + ';' : ''}
    class:toggle={showMain}
    class="{mobile ? 'mobile' : 'pc'} record"
  >
    {#if !isLogin}
      <div class="switch" on:click={onTapEventShow}>登录</div>
    {/if}

    <div class="switch" on:click={onTapEventShow}>录制</div>
    <!-- <div class="switch" on:click={onTapEventShow}>停止录制</div> -->

    <div class="mask" style="display: {showMask ? 'block' : 'none'};" on:click={onTapEventHide} />
    <div class="panel">
      <div style="padding: 20px 0">
        {#if !isLogin}
          <LoginForm on:loginResult={handleLoginResult} />
        {/if}
      </div>
    </div>
  </div>
</main>

<style scoped lang="less">
  @import './var.less';

  // 背景遮罩
  .mask {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 10001;
    transition: background 0.3s;
    overflow-y: scroll;
  }
  // 控制面板
  .panel {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -100%;
    z-index: 10002;
    background-color: #fff;
    transition: bottom 0.3s;
  }

  .toggle {
    .mask {
      background: rgba(0, 0, 0, 0.6);
      display: block;
    }
    .panel {
      display: block;
      bottom: 0;
    }
  }

  // .mobile {
  //   .panel {
  //   }
  // }
  // .pc {
  //   .panel {
  //   }
  // }

  .switch {
    display: block;
    position: fixed;
    right: 0.76923077em;
    bottom: 0.76923077em;
    color: #fff;
    background-color: #07c160;
    line-height: 1;
    font-size: 1.07692308em;
    padding: 0.61538462em 1.23076923em;
    z-index: 10000;
    border-radius: 0.30769231em;
    box-shadow: 0 0 0.61538462em rgb(0 0 0 / 40%);
  }
</style>
