import { CustomElementOptions } from '@ficusjs/core'

export interface FicusComponent<TS> extends HTMLElement {
  setState: (stateFn: (state: TS) => Partial<TS>, callback: () => void) => void
}

export type ComponentOptions<TS, TE> = CustomElementOptions<TE> & {
  state?: () => TS
}

export declare function createComponent<TS, TE>(tagName: string, options: ComponentOptions<TS, TE>): void
