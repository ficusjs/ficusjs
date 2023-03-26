// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { machine as fsm } from '../src/fsm/form-submission-fsm.mjs'

describe('Form Submission State Machine', () => {
  it('From idle, on SUBMIT', () => {
    const { value } = fsm.transition('idle', { type: 'SUBMIT' })
    expect(value).toEqual('submitting')
  })
  it('From submitting, on SUCCESS', () => {
    const { value } = fsm.transition('submitting', { type: 'SUCCESS' })
    expect(value).toEqual('success')
  })
  it('From submitting, on ERROR', () => {
    const { value } = fsm.transition('submitting', { type: 'ERROR' })
    expect(value).toEqual('error')
  })
  it('From success, on CLEAR', () => {
    const { value } = fsm.transition('success', { type: 'CLEAR' })
    expect(value).toEqual('idle')
  })
  it('From error, on SUBMIT', () => {
    const { value } = fsm.transition('error', { type: 'SUBMIT' })
    expect(value).toEqual('submitting')
  })
})
