import type { SvelteComponent } from 'svelte';
import { default as RecordCompClass } from './component/index.svelte';

export class ElvinRecord {
  protected compInstance: SvelteComponent | any = null;
  constructor(baseUrl: string) {
    this._initComponent(baseUrl);
  }

  private _initComponent(baseUrl: string) {
    const target: HTMLElement = document.documentElement;

    this.compInstance = new RecordCompClass({
      target,
      props: {
        baseUrl
      }
    });
  }
}
