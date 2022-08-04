import { record } from 'rrweb';
import type { ViewModel, VueInstance } from '../../interface';
import { extractErrorStack } from '../../utils/extractErrorStack';
import { getBigVersion } from '../../utils/helpers';
import { variableTypeDetection } from '../../utils/is';

export function handleVueError(err: Error, vm: ViewModel, info: string, Vue: VueInstance): void {
  const version = Vue?.version;
  let data = extractErrorStack(err);

  if (variableTypeDetection.isString(version)) {
    console.log('getBigVersion', getBigVersion(version));
    switch (getBigVersion(version)) {
      case 2:
        data = { ...data, ...vue2VmHandler(vm) };
        break;
      case 3:
        data = { ...data, ...vue3VmHandler(vm) };
        break;
      default:
        return;
    }

    record.addCustomEvent('error', {
      event: data
    });
  }
}

function vue2VmHandler(vm: ViewModel) {
  let componentName = '';

  if (vm.$root === vm) {
    componentName = 'root';
  } else {
    const name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;

    componentName =
      (name ? 'component <' + name + '>' : 'anonymous component') +
      (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');
  }

  return {
    componentName,
    propsData: vm.$options && vm.$options.propsData
  };
}

function vue3VmHandler(vm: ViewModel) {
  let componentName = '';

  if (vm.$root === vm) {
    componentName = 'root';
  } else {
    console.log(vm.$options);
    const name = vm.$options && vm.$options.name;

    componentName = name ? 'component <' + name + '>' : 'anonymous component';
  }

  return {
    componentName,
    propsData: vm.$props
  };
}
