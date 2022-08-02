import type { SvelteComponent } from 'svelte';

export class ElvinRecord {
  protected compInstance: SvelteComponent | any = null;
  constructor() {}

  private _initComponent() {
    const target: HTMLElement = document.documentElement;
  }
}
