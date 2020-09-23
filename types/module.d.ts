import { createComponent } from './component'
import { createEventBus, getEventBus } from './event'
import { createStore, createPersist, getStore } from './store'

type CreateComponentFn = typeof createComponent
type UseFn = typeof use
type CreateEventBusFn = typeof createEventBus
type CreatePersistFn = typeof createPersist
type CreateStoreFn = typeof createStore
type GetEventBusFn = typeof getEventBus
type GetStoreFn = typeof getStore

interface ComponentModuleArgument {
  createComponent: CreateComponentFn
  use: UseFn
  createEventBus?: CreateEventBusFn
  createPersist?: CreatePersistFn
  createStore?: CreateStoreFn
  getEventBus?: GetEventBusFn
  getStore?: GetStoreFn
}

export interface ComponentModule {
  create: (arg: ComponentModuleArgument) => void
}

export declare function use<D, I, S> (module: ComponentModule): void
