type EventCallback<D> = (data: D) => void

type EventUnsubscribe = () => void

declare class Events<D> {
  subscribe (event: string, callback: EventCallback<D>): EventUnsubscribe
  publish (event: string, data: D): void
}

export declare function createEventBus<D> (): Events<D>

export declare function getEventBus<D> (): Events<D>
