import { Store } from './store'
import { ComponentOptions } from './component'

export declare function withStore<S, I, T> (store: Store<S>, options: ComponentOptions<I, T>)
