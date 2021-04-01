import test from 'ava'
import sinon from 'sinon'
import { createEventBus, getEventBus } from '../../src/event-bus.mjs'
import {getStore} from "../../src/index.mjs";

let eventBus

test.beforeEach(t => {
  eventBus = createEventBus()
})

test('create an events bus', t => {
  t.truthy(eventBus)
})

test('call subscribers on publish', t => {
  const callback = sinon.spy()
  eventBus.subscribe('message', callback)

  eventBus.publish('message', 'contents')

  t.truthy(callback.called)
  t.truthy(callback.calledWith('contents'))
})

test('does not call subscribers on publish', t => {
  const callback = sinon.spy()
  eventBus.subscribe('message', callback)

  eventBus.publish('message-not-exists', 'contents')

  t.falsy(callback.called)
})

test('call subscribers when subscribed', t => {
  const callback = sinon.spy()
  const unsub = eventBus.subscribe('message', callback)

  eventBus.publish('message', 'contents')

  t.truthy(callback.called)
  t.truthy(callback.calledWith('contents'))

  unsub()
  callback.resetHistory()

  eventBus.publish('message', 'contents')
  t.falsy(callback.called)
})

test('get an events bus', t => {
  const thisEventBus = getEventBus()
  t.is(thisEventBus, eventBus)
})
