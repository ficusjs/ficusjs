// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import { dataFetchStateMachine as fsm } from '../src/fsm/data-fetch-fsm.mjs'

beforeEach(async () => {
  // Reset the state machine before each test
  fsm.start()
})

describe('Data Fetch State Machine', () => {
  it('When on "idle", if "LOAD" event occurs, fsm should reach "loading". No context should be available', t => {
    fsm.send('LOAD')
    const { value, context } = fsm.state

    expect(value).toEqual('loading')
    expect(context.data).toEqual(null)
    expect(context.error).toEqual(null)
  })

  it('When on "loading", if "SUCCESS" event occurs, fsm should reach "loaded". Data should be available in the context', t => {
    fsm.send('LOAD')
    fsm.send({ type: 'SUCCESS', data: 'test-data' })
    const { value, context } = fsm.state

    expect(value).toEqual('loaded')
    expect(context.data).toEqual('test-data')
    expect(context.error).toEqual(null)
  })

  it('When on "loading", if "ERROR" event occurs, fsm should reach "error". Error should be available in the context', t => {
    fsm.send('LOAD')
    fsm.send({ type: 'ERROR', error: 'test-error' })
    const { value, context } = fsm.state

    expect(value).toEqual('error')
    expect(context.data).toEqual(null)
    expect(context.error).toEqual('test-error')
  })

  it('When on "loaded", if "REFRESH" event occurs, fsm should reach "loading". Data should be available in the context', t => {
    fsm.send('LOAD')
    fsm.send({ type: 'SUCCESS', data: 'test-data' })
    fsm.send('REFRESH')
    const { value, context } = fsm.state

    expect(value).toEqual('loading')
    expect(context.data).toEqual('test-data')
    expect(context.error).toEqual(null)
  })

  it('When on "error", if "RETRY" event occurs, fsm should reach "loading". Error should be available in the context', t => {
    fsm.send('LOAD')
    fsm.send({ type: 'ERROR', error: 'test-error' })
    fsm.send('RETRY')
    const { value, context } = fsm.state

    expect(value).toEqual('loading')
    expect(context.data).toEqual(null)
    expect(context.error).toEqual('test-error')
  })
})
