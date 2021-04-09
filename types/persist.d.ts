export declare function createPersist(namespace: string, storage: 'local' | 'session'): void

declare class Persist<S> {
  constructor(namespace: string)
  setState (state: S): void
  getState (): S
  removeState (): void
}
