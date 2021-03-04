import { EventBus } from './event'
import { ComponentOptions, FicusComponent } from './component'

export interface FicusComponentWithEventBus<S, D> extends FicusComponent<S> {
  setEventBus: (eventBus: EventBus<D>) => void
}

export declare function withEventBus<D, I, T> (eventBus: EventBus<D>, options: ComponentOptions<I, T>)
