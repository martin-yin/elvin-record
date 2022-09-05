import type { SvelteComponent } from 'svelte';
import { default as RecordCompClass } from './component/index.svelte';

export type ElvinRecordProps = {
  reportUrl: string;
  appId: string;
  loginUrl: string;
  release: string;
};

export class ElvinRecord {
  protected compInstance: SvelteComponent | any = null;
  constructor(options: ElvinRecordProps) {
    this._initComponent(options);
  }

  private _initComponent({ reportUrl, appId, loginUrl, release }: ElvinRecordProps) {
    const target: HTMLElement = document.documentElement;

    this.compInstance = new RecordCompClass({
      target,
      props: {
        reportUrl,
        appId,
        loginUrl,
        release
      }
    });
  }
}
