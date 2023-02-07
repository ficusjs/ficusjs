import { createMachine, createXStateService } from '../../util/ficus.mjs'

const definition = {
  id: 'form-submission',
  initial: 'idle',
  states: {
    idle: {
      on: {
        SUBMIT: {
          target: 'submitting'
        }
      }
    },
    submitting: {
      on: {
        SUCCESS: {
          target: 'success'
        },
        ERROR: {
          target: 'error'
        }
      }
    },
    success: {
      on: {
        CLEAR: {
          target: 'idle'
        }
      }
    },
    error: {
      on: {
        SUBMIT: {
          target: 'submitting'
        }
      }
    }
  }
}

const machine = createMachine(definition)

export const formSubmissionStateMachine = createXStateService('form.submission', machine)
