// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import { formSubmissionStateMachine as fsm } from '../src/fsm/form-submission-fsm.mjs'

beforeEach(async () => {
  // Reset the state machine before each test
  fsm.start()
})

describe('Data Fetch State Machine', () => {
  it('When on "idle", if "SUBMIT" event occurs, fsm should reach "submitting"', t => {
    fsm.send('SUBMIT')

    expect(fsm.state.value).toEqual('submitting')
  })

  it('When on "submitting", if "SUCCESS" event occurs, fsm should reach "success"', t => {
    fsm.send('SUBMIT')
    fsm.send('SUCCESS')

    expect(fsm.state.value).toEqual('success')
  })

  it('When on "submitting", if "ERROR" event occurs, fsm should reach "error"', t => {
    fsm.send('SUBMIT')
    fsm.send('ERROR')

    expect(fsm.state.value).toEqual('error')
  })

  it('When on "success", if "CLEAR" event occurs, fsm should reach "idle"', t => {
    fsm.send('SUBMIT')
    fsm.send('SUCCESS')
    fsm.send('CLEAR')

    expect(fsm.state.value).toEqual('idle')
  })

  it('When on "error", if "SUBMIT" event occurs, fsm should reach "submitting"', t => {
    fsm.send('SUBMIT')
    fsm.send('ERROR')
    fsm.send('SUBMIT')

    expect(fsm.state.value).toEqual('submitting')
  })
})
