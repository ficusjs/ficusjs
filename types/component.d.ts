import { CustomElementOptions } from '@ficusjs/core'

export interface FicusComponent<TS> extends HTMLElement {
  setState: (stateFn: (state: TS) => Partial<TS>, callback: () => void) => void
}

export type ComponentOptions<TS, TE, TP> = CustomElementOptions<TE, TP> & {
  state?: () => TS
}

export declare function createComponent<TS, TE, TP>(tagName: string, options: ComponentOptions<TS, TE, TP>): void
