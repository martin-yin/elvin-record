<script lang="ts">
  export let show = true;
  export let position = { x: 0, y: 0 };

  const switchPos = {
    hasMoved: false,
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0
  };
  const btnSwitchPos = {
    x: 0,
    y: 0
  };
  let btnSwitch: HTMLElement;

  $: {
    if (btnSwitch) {
      setSwitchPosition(position.x, position.y);
    }
  }

  const setSwitchPosition = (switchX: number, switchY: number) => {
    [switchX, switchY] = _getSwitchButtonSafeAreaXY(switchX, switchY);
    switchPos.x = switchX;
    switchPos.y = switchY;
    btnSwitchPos.x = switchX;
    btnSwitchPos.y = switchY;
    // tool.setStorage('switch_x', switchX + '');
    // tool.setStorage('switch_y', switchY + '');
  };

  const _getSwitchButtonSafeAreaXY = (x: number, y: number) => {
    const docWidth = Math.max(document.documentElement.offsetWidth, window.innerWidth);
    const docHeight = Math.max(document.documentElement.offsetHeight, window.innerHeight);
    if (x + btnSwitch.offsetWidth > docWidth) {
      x = docWidth - btnSwitch.offsetWidth;
    }
    if (y + btnSwitch.offsetHeight > docHeight) {
      y = docHeight - btnSwitch.offsetHeight;
    }
    if (x < 0) {
      x = 0;
    }
    if (y < 20) {
      y = 20;
    }
    return [x, y];
  };

  const onTouchStart = (e: any) => {
    switchPos.startX = e.touches[0].pageX;
    switchPos.startY = e.touches[0].pageY;
    switchPos.hasMoved = false;
  };
  const onTouchEnd = (e: any) => {
    if (!switchPos.hasMoved) {
      return;
    }
    switchPos.startX = 0;
    switchPos.startY = 0;
    switchPos.hasMoved = false;
    setSwitchPosition(switchPos.endX, switchPos.endY);
  };
  const onTouchMove = (e: any) => {
    if (e.touches.length <= 0) {
      return;
    }
    const offsetX = e.touches[0].pageX - switchPos.startX,
      offsetY = e.touches[0].pageY - switchPos.startY;
    let x = Math.floor(switchPos.x - offsetX),
      y = Math.floor(switchPos.y - offsetY);
    [x, y] = _getSwitchButtonSafeAreaXY(x, y);
    btnSwitchPos.x = x;
    btnSwitchPos.y = y;
    switchPos.endX = x;
    switchPos.endY = y;
    switchPos.hasMoved = true;

    console.log(switchPos, 'switchPos');

    e.preventDefault();
  };
</script>

<div
  class="record-btn"
  style="right: 20px; bottom: {btnSwitchPos.y}px; display: {show ? 'block' : 'none'};"
  bind:this={btnSwitch}
  on:touchstart={onTouchStart}
  on:touchend={onTouchEnd}
  on:touchmove={onTouchMove}
>
  录制
</div>

<style scoped lang="less">
  @import '../var.less';

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
