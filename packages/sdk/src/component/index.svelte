<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { ActionRecordStatus } from '../interface';
  import { ActionRecord } from '../record/action-record';
  import LoginForm from './login-form/login-form.svelte';
  const dispatch = createEventDispatcher();
  let isLogin = false;
  let showLoginPanel = false;

  let recordStatus: ActionRecordStatus = ActionRecordStatus.done;

  let fontSize = '';
  let actionRecord: ActionRecord;

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
    const login = localStorage.getItem('login');
    if (login) {
      isLogin = true;
      actionRecord = new ActionRecord({
        unloadRecord: true
      });
      if (actionRecord.getRecordStatus() === ActionRecordStatus.recording) {
        recordStatus = ActionRecordStatus.recording;
      }
    }
  });

  const handleLoginResult = (event: any) => {
    if (event.detail.result === '登录成功了, 哥') {
      showLoginPanel = false;
      isLogin = true;
      actionRecord = new ActionRecord({
        unloadRecord: true
      });
    }
  };

  const onTapEventShow = (e: any) => {
    showLoginPanel = true;
    dispatch('show', { showLoginPanel: true });
  };

  const onTapEventHide = (e: any) => {
    showLoginPanel = false;
    dispatch('show', { showLoginPanel: false });
  };

  /**
   * 开始录制
   */
  const startRecord = () => {
    const status = actionRecord.startRecord();
    if (status) {
      recordStatus = status;
    }
  };

  /**
   * 停止录制
   */
  const stopRecord = () => {
    const status = actionRecord.stopRecord();
    if (status === ActionRecordStatus.done) {
      recordStatus = status;
    }
  };
</script>

<main>
  <div style={fontSize ? 'font-size:' + fontSize + ';' : ''}>
    {#if !isLogin}
      <div class="record-btn" on:click={onTapEventShow}>登录</div>
    {:else if recordStatus === 0}
      <div class="record-btn" on:click={startRecord}>录制</div>
    {:else}
      <div class="record-btn" on:click={stopRecord}>停止录制</div>
    {/if}

    <div class:toggle={showLoginPanel}>
      <div class="mask" on:click={onTapEventHide} />
      <div class="panel">
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
      padding: 4% 4%;
      bottom: 0;
    }
  }

  .record-btn {
    display: block;
    position: fixed;
    right: (16em / @font);
    bottom: (16em / @font);
    color: #fff;
    background-color: #1890ff;
    line-height: 1;
    font-size: (16em / @font);
    padding: (10em / @font) (16em / @font);
    z-index: 10000;
    border-radius: (4em / @font);
    box-shadow: 0 0 (8em / @font) rgb(0 0 0 / 40%);
  }
</style>
