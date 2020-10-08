type EventCallback<D> = (data: D) => void

type EventUnsubscribe = () => void

export declare class EventBus<D> {
  subscribe (event: string, callback: EventCallback<D>): EventUnsubscribe
  publish (event: string, data: D): void
}

export declare function createEventBus<D> (): EventBus<D>

export declare function getEventBus<D> (): EventBus<D>
