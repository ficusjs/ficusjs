// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { machine as fsm } from '../src/fsm/data-fetch-fsm.mjs'

describe('Data Fetch State Machine', () => {
  it('From idle, on LOAD', () => {
    const { value, context } = fsm.transition('idle', { type: 'LOAD' })
    expect(value).toEqual('loading')
    expect(context.data).toEqual(null)
    expect(context.error).toEqual(null)
  })
  it('From loading, on SUCCESS', () => {
    const { value, context } = fsm.transition('loading', { type: 'SUCCESS', data: 'test-data' })
    expect(value).toEqual('loaded')
    expect(context.data).toEqual('test-data')
    expect(context.error).toEqual(null)
  })
  it('From loading, on ERROR', () => {
    const { value, context } = fsm.transition('loading', { type: 'ERROR', error: 'test-error' })
    expect(value).toEqual('error')
    expect(context.data).toEqual(null)
    expect(context.error).toEqual('test-error')
  })
  it('From loaded, on REFRESH', () => {
    const loaded = fsm.transition('loading', { type: 'SUCCESS', data: 'test-data' })
    const { value, context } = fsm.transition(loaded, { type: 'REFRESH' })
    expect(value).toEqual('loading')
    expect(context.data).toEqual('test-data')
    expect(context.error).toEqual(null)
  })

  it('From error, on RETRY', () => {
    const error = fsm.transition('loading', { type: 'ERROR', error: 'test-error' })
    const { value, context } = fsm.transition(error, { type: 'RETRY' })
    expect(value).toEqual('loading')
    expect(context.data).toEqual(null)
    expect(context.error).toEqual('test-error')
  })
})
