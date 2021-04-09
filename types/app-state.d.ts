import { Persist } from './persist'

export type AppStateStoreAction = (payload?: any) => void

export interface AppStateStoreOfStores<S> {
  [key: string]: AppStateStoreClass<S>
}

export interface AppStateStoreBaseOptions<S> {
  initialState?: S
  persist?: string | Persist<S>
  ttl?: number
}

export type AppStateStoreOptions<S> = AppStateStoreBaseOptions<S> & {
  [key: string]: AppStateStoreAction
}

export type AppStateStore<S> = AppStateStoreOfStores<S> | AppStateStoreClass<S>

declare class AppStateStoreClass<S> {
  constructor(options: AppStateStoreOptions<S>)
  setState (setter: (state: S) => any, callback?: () => void): void
  getState (key: string): any
  subscribe (callback: () => any): void
  clear (notifySubscribers?: boolean): void
}

export declare function createAppState<S> (key: string, options: AppStateStoreOptions<S>): AppStateStoreClass<S>

export declare function getAppState<S> (key: string): AppStateStoreClass<S>
