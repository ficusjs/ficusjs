import { createComponent, html } from '../util/component.mjs'

createComponent('mock-props', {
  mounted () {
    // console.log('mock-props mounted!')
  },
  render () {
    return html`
      <mock-props-child
        prop1="value 1"
        prop2="value 2"
        prop3="value 3"
      ></mock-props-child>
    `
  }
})

createComponent('mock-props-child', {
  created () {
    // console.log('mock-props-child created!')
  },
  updated () {
    // console.log('mock-props-child updated!')
  },
  mounted () {
    // console.log('mock-props-child mounted!')
  },
  props: {
    prop1: {
      type: String
    },
    prop2: {
      type: String
    },
    prop3: {
      type: String
    }
  },
  render () {
    // console.log('render!')
    return html`
      <span>${this.props.prop1}</span>
      <span>${this.props.prop2}</span>
      <span>${this.props.prop3}</span>
    `
  }
})
