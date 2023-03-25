import { createMachine, createXStateService, assign } from '../util/ficus.mjs'

const definition = {
  id: 'data-fetch',
  context: { data: null, error: null },
  initial: 'idle',
  states: {
    idle: {
      on: {
        LOAD: {
          target: 'loading'
        }
      }
    },
    loading: {
      on: {
        SUCCESS: {
          target: 'loaded',
          actions: assign((_, event) => ({ data: event.data, error: null }))
        },
        ERROR: {
          target: 'error',
          actions: assign((_, event) => ({ data: null, error: event.error }))
        }
      }
    },
    loaded: {
      on: {
        REFRESH: {
          target: 'loading'
        }
      }
    },
    error: {
      on: {
        RETRY: {
          target: 'loading'
        }
      }
    }
  }
}

const getters = {
  data: (context) => context.data,
  error: (context) => context.error
}

const machine = createMachine(definition)

export const dataFetchStateMachine = createXStateService('data.fetch', machine, getters)
