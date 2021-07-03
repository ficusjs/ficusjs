import { customElementCreator as createCustomElement, withStore, createAppState, createStore, html, renderer } from '../util/component.mjs'

const store = createAppState('an.example.store', {
  initialState: {
    elementsOrder: ['first', 'second', 'third'],
    elementsByName: {
      first: { name: 'first' },
      second: { name: 'second' },
      third: { name: 'third' }
    }
  },
  deleteElement (elementName) {
    this.setState(state => {
      return {
        elementsOrder: state.elementsOrder.filter(eId => eId !== elementName),
        elementsByName: Object.fromEntries(
          Object.entries(state.elementsByName).filter(([key, e]) => e.name !== elementName)
        )
      }
    })
  }
})

const store2 = createStore('an.example.store2', {
  initialState: {
    elementsOrder: ['first', 'second', 'third'],
    elementsByName: {
      first: { name: 'first' },
      second: { name: 'second' },
      third: { name: 'third' }
    }
  },
  actions: {
    deleteElement (context, elementName) {
      context.begin()
      context.commit('setElementsOrder', context.state.elementsOrder.filter(eId => eId !== elementName))
      context.commit('setElementsByName', Object.fromEntries(
        Object.entries(context.state.elementsByName).filter(([key, e]) => e.name !== elementName)
      ))
    }
  },
  mutations: {
    setElementsOrder (state, payload) {
      state.elementsOrder = payload
      return state
    },
    setElementsByName (state, payload) {
      state.elementsByName = payload
      return state
    }
  }
})

createCustomElement(
  'elements-list',
  withStore(store2, {
    renderer,
    render () {
      console.log('Render list')
      return html`
        ${this.store.state.elementsOrder.map(elementName => {
        return html`
            <element-component element-name=${elementName}></element-component>
          `
      })}
      `
    }
  })
)

createCustomElement(
  'element-component',
  withStore(store2, {
    renderer,
    props: {
      elementName: { type: String }
    },
    deleteElement () {
      // this.store.deleteElement(this.props.elementName)
      this.store.dispatch('deleteElement', this.props.elementName)
    },
    render () {
      if (!this.store.state.elementsByName[this.props.elementName]) {
        return
      }
      console.log(`Render element ${this.props.elementName}`)
      return html`
        <p>${this.store.state.elementsByName[this.props.elementName].name} <button @click=${this.deleteElement}>X</button></p>
      `
    }
  })
)
