import { Events } from './event'
import { Store } from './store'

export interface FicusComponent<S, D> extends HTMLElement {
  setStore: (store: Store<S>) => void
  setEvents: (events: Events<D>) => void
}

export type ComponentGetter = () => any
export type ComponentMethod = (...args: any[]) => void

export interface ComponentProperty {
  type: String | Number | Boolean | Object
  required?: boolean
  observed?: boolean
  default?: string | number | boolean | object
}

export interface ComponentComputedTree {
  [key: string]: ComponentGetter
}

export interface ComponentPropertyTree {
  [key: string]: ComponentProperty
}

export type ComponentOptions<I, T, D, S> = {
  renderer: (what: T, where: any) => void
  render: () => T
  computed?: ComponentComputedTree
  props?: ComponentPropertyTree
  created?: () => void
  mounted?: () => void
  updated?: () => void
  removed?: () => void
  state?: () => I,
  eventBus?: Events<D>
  store?: Store<S>
} & {
  [key: string]: ComponentMethod
}

export declare function createComponent<I, T, D, S>(tagName: string, options: ComponentOptions<I, T, D, S>): void
