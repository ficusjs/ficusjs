import { createComponentWithStateMachine, html } from '../util/component.mjs'

createComponentWithStateMachine('mock-people', {
  states: {
    idle: {
      on: {
        CLICK: 'loading'
      }
    },
    loading: {
      on: {
        RESOLVE: 'person',
        REJECT: 'error'
      }
    },
    person: {
      on: {
        CLICK: 'loading'
      }
    },
    error: {
      on: {
        CLICK: 'loading'
      }
    }
  },
  actions: {
    loading () {
      const person = this.people[Math.floor(Math.random() * this.people.length)]
      setTimeout(() => {
        person !== 'error'
          ? this.setState({ person }, () => this.send('RESOLVE'))
          : this.send('REJECT')
      }, 500)
    }
  }
}, {
  computed: {
    people () {
      return [
        'https://randomuser.me/api/portraits/men/1.jpg',
        'https://randomuser.me/api/portraits/men/2.jpg',
        'https://randomuser.me/api/portraits/men/3.jpg',
        'error'
      ]
    }
  },
  render () {
    const { context, value } = this.state
    const { person } = context

    const buttonText = {
      idle: 'Fetch person',
      loading: 'Loading...',
      error: 'Person fail, retry?',
      person: 'Fetch another person'
    }[value]

    return html`
      <div>
        ${person ? html`<img src="${person}" alt="" />` : ''}
        ${value === 'error' ? html`<span>Error: person not found</span>` : ''}
        <button type="button"
          @click="${() => this.send('CLICK')}"
          ?disabled="${value === 'loading'}"
        >${buttonText}</button>
      </div>
    `
  }
})
