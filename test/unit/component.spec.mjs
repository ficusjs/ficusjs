import { JSDOM } from 'jsdom'
import test from 'ava'
import { createComponent } from '../../src/component.mjs'
import { renderer } from '../helpers/renderer.mjs'

let window
let document

test.before(t => {
  const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>')
  window = dom.window
  document = dom.window.document
  globalThis.customElements = window.customElements
  globalThis.HTMLElement = window.HTMLElement
  globalThis.document = document
})

test('has p tag', t => {
  const body = document.body
  const pTag = document.createElement('p')
  pTag.textContent = 'Hello world'
  body.appendChild(pTag)
  t.is(document.querySelector('p').textContent, 'Hello world')
})

test('render basic component', t => {
  const body = document.body
  createComponent('basic-comp', {
    renderer,
    render () {
      return '<p>Basic component</p>'
    }
  })
  const basicComp = document.createElement('basic-comp')
  body.appendChild(basicComp)
  t.is(document.querySelector('basic-comp p').textContent, 'Basic component')
})

test('component with state', t => {
  const body = document.body
  createComponent('comp-with-state', {
    renderer,
    state () {
      return {
        text: 'With state'
      }
    },
    render () {
      return `<div>
        <p>${this.state.text}</p>
      </div>`
    }
  })
  const compWithState = document.createElement('comp-with-state')
  body.appendChild(compWithState)
  t.is(document.querySelector('comp-with-state p').textContent, 'With state')
})
