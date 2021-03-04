import { Store } from './store'
import { ComponentOptions, FicusComponent } from './component'

export interface FicusComponentWithStore<S> extends FicusComponent<S> {
  setStore: (store: Store<S>) => void
}

export declare function withStore<S, I, T> (store: Store<S>, options: ComponentOptions<I, T>)
