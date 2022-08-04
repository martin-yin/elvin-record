import type { VueInstance, ViewModel } from '../../interface';
import { handleVueError } from './helper';

/**
 * 提供给vue的插件
 */
export const recordVue = {
  install(Vue: VueInstance): void {
    if (!Vue || !Vue.config) return;
    // vue 提供 warnHandler errorHandler报错信息
    Vue.config.errorHandler = function (err: Error, vm: ViewModel, info: string): void {
      handleVueError.apply(null, [err, vm, info, Vue]);
    };
  }
};
