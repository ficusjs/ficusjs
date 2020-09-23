export type StoreGetter<S> = (context: StoreClass<S>) => any
export type StoreAction<S> = (context: StoreActionContext<S>, payload?: any) => void
export type StoreDispatch<S> = (actionKey: keyof StoreActionTree<S>, payload: any) => void
export type StoreCommit<S> = (mutationKey: keyof StoreMutationTree<S>, payload: any) => void
export type StoreActionContext<S> = StoreClass<S>
export type StoreMutation<S> = (state: S, payload: any) => S

export interface StoreGetterTree<S> {
  [key: string]: StoreGetter<S>
}

export interface StoreActionTree<S> {
  [key: string]: StoreAction<S>
}

export interface StoreMutationTree<S> {
  [key: string]: StoreMutation<S>
}

export interface StoreOfStores<S> {
  [key: string]: StoreClass<S>
}

export interface StoreOptions<S> {
  initialState?: S
  getters?: StoreGetterTree<S>
  actions?: StoreActionTree<S>
  mutations?: StoreMutationTree<S>
  persist?: string | Persist<S>
}

export type Store<S> = StoreOfStores<S> | StoreClass<S>

declare class StoreClass<S> {
  constructor(options: StoreOptions<S>)
  dispatch (actionKey: keyof StoreActionTree<S>, payload: any): StoreDispatch<S>
  commit (mutationKey: keyof StoreMutationTree<S>, payload: any): StoreCommit<S>
  subscribe (callback: () => any): void
  begin (): void
  end (): void
  rollback (): void
  clear (notifySubscribers?: boolean): void
}

export declare function createStore<S> (key: string, options: StoreOptions<S>): StoreClass<S>

export declare function createPersist(namespace: string, storage: 'local' | 'session'): void

declare class Persist<S> {
  constructor(namespace: string)
  setState (state: S): void
  getState (): S
  removeState (): void
}

export declare function getStore<S> (key: string): StoreClass<S>
