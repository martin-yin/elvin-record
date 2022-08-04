import type { SvelteComponent } from 'svelte';
import { default as RecordCompClass } from './component/index.svelte';

export class ElvinRecord {
  protected compInstance: SvelteComponent | any = null;
  constructor() {
    this._initComponent();
  }

  private _initComponent() {
    const target: HTMLElement = document.documentElement;

    this.compInstance = new RecordCompClass({
      target
    });
  }
}
