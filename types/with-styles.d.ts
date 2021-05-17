import { CustomElementOptions } from '@ficusjs/core'

export type StyleOrURLString = string

export type ComponentOptionsWithStyles<T> = CustomElementOptions<T> & {
  styles(): StyleOrURLString[] | StyleOrURLString
}

export declare function withStyles<I, T> (options: ComponentOptionsWithStyles<T>)
