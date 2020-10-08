import { ComponentOptions } from './component'

export type ComponentOptionsWithStateTransactions<I, T> = ComponentOptions<I, T> & {
  beginTransaction(): void
  endTransaction(): void
  rollbackTransaction(): void
}

export declare function withStateTransactions<I, T> (options: ComponentOptionsWithStateTransactions<I, T>)
