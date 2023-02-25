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
          actions: ['dataHandler']
        },
        ERROR: {
          target: 'error',
          actions: ['errorHandler']
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

const options = {
  actions: {
    dataHandler: assign((context, event) => {
      return {
        data: event.data,
        error: null
      }
    }),
    errorHandler: assign((context, event) => {
      return {
        data: null,
        error: event.error
      }
    })
  }
}

const getters = {
  data (context) {
    return context.data
  },
  error (context) {
    return context.error
  }
}

const machine = createMachine(definition, options)

export const dataFetchStateMachine = createXStateService('data.fetch', machine, getters)
