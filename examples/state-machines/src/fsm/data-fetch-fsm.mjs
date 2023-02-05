import { createMachine, createXStateService, assign } from '../../util/ficus.mjs'

const definition = {
  id: 'data-fetch',
  context: { data: null },
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
          actions: ['dataHandler']
        },
        ERROR: {
          target: 'error'
        }
      }
    },
    loaded: {},
    error: {
      on: {
        RETRY: {
          target: 'loading'
        }
      }
    }
  }
}

const options = {
  actions: {
    dataHandler: assign({
      data: (context, event) => event.data
    })
  }
}

const machine = createMachine(definition, options)

export const dataFetchStateMachine = createXStateService('data.fetch', machine)

