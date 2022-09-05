<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { ActionRecordStatus } from '../interface';
  import { ActionRecord } from '../record/action-record';
  import LoginForm from './login-form/login-form.svelte';
  import RecordButton from './record-button/record-button.svelte';
  import axios from 'axios';

  const dispatch = createEventDispatcher();
  let showLoginPanel = false;
  let actionRecord: ActionRecord;
  let recordStatus: ActionRecordStatus = ActionRecordStatus.done;
  let loginStatus = false;

  export let reportUrl = '';
  export let appId = '';
  export let loginUrl = '';
  export let release = '';

  let switchButtonPosition = { x: 20, y: 20 };
  let fontSize = '';

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

    const token = localStorage.getItem('token');
    if (token) {
      loginStatus = true;
      actionRecord = new ActionRecord({
        reportUrl,
        appId,
        release
      });
      if (actionRecord.getRecordStatus() === ActionRecordStatus.recording) {
        recordStatus = ActionRecordStatus.recording;
      }
    }
  });

  const onTapEventShow = (e: any) => {
    showLoginPanel = true;
    dispatch('show', { showLoginPanel: true });
  };

  const onTapEventHide = (e: any) => {
    showLoginPanel = false;
    dispatch('show', { showLoginPanel: false });
  };

  const handleLogin = async (event: any) => {
    const { data } = await axios.post(loginUrl, event.detail);
    if (data.code === 200) {
      loginStatus = true;
      showLoginPanel = false;
      actionRecord = new ActionRecord({
        reportUrl,
        appId,
        release
      });

      localStorage.setItem('token', data.data.accessToken);
    }
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
    <RecordButton bind:position={switchButtonPosition}>
      {#if !loginStatus}
        <div on:click={onTapEventShow}>登录</div>
      {:else if recordStatus === ActionRecordStatus.done}
        <div on:click={startRecord}>录制</div>
      {:else}
        <div on:click={stopRecord}>停止录制</div>
      {/if}
    </RecordButton>

    <div class:toggle={showLoginPanel}>
      <div class="mask" on:click={onTapEventHide} />
      <div class="panel">
        <LoginForm on:login={handleLogin} />
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

  // .record-btn {
  //   display: block;
  //   position: fixed;
  //   right: (16em / @font);
  //   bottom: (16em / @font);
  //   color: #fff;
  //   background-color: #1890ff;
  //   line-height: 1;
  //   font-size: (16em / @font);
  //   padding: (10em / @font) (16em / @font);
  //   z-index: 10000;
  //   border-radius: (4em / @font);
  //   box-shadow: 0 0 (8em / @font) rgb(0 0 0 / 40%);
  // }
</style>
