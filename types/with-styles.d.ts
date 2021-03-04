import { ComponentOptions } from './component'

export type StyleOrURLString = string

export type ComponentOptionsWithStyles<I, T> = ComponentOptions<I, T> & {
  styles(): StyleOrURLString[] | StyleOrURLString
}

export declare function withStyles<I, T> (options: ComponentOptionsWithStyles<I, T>)
