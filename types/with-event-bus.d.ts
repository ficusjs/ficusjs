import { EventBus } from './event'
import { ComponentOptions } from './component'

export declare function withEventBus<D, I, T> (eventBus: EventBus<D>, options: ComponentOptions<I, T>)
