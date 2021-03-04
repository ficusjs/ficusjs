import { ComponentOptions, FicusComponent } from './component'

export interface FicusComponentWithStateTransactions<S> extends FicusComponent<S> {
  beginTransaction(): void
  endTransaction(): void
  rollbackTransaction(): void
}

export declare function withStateTransactions<I, T> (options: ComponentOptions<I, T>)
