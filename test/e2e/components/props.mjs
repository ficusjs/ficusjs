import { createComponent, html } from '../util/component.mjs'

createComponent('mock-props', {
  props: {
    displayString: {
      type: String
    },
    config: {
      type: Object
    }
  },
  render () {
    return html`<span>Props component with displayString prop of <strong>${this.props.displayString}</strong></span>
<span>Props component with config prop of <strong>${JSON.stringify(this.props.config)}</strong></span>`
  }
})

createComponent('mock-props-default', {
  props: {
    displayString: {
      type: String,
      default: 'the pink panther'
    }
  },
  render () {
    return html`<span>Props component with default of <strong>${this.props.displayString}</strong></span>`
  }
})

createComponent('mock-props-default-number', {
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  render () {
    console.log(typeof this.props.count)
    return html`<span>Props component with default number of <strong>${this.props.count}</strong></span>`
  }
})

createComponent('mock-props-default-boolean-true', {
  props: {
    hasLoaded: {
      type: Boolean,
      default: true
    }
  },
  render () {
    console.log(typeof this.props.hasLoaded)
    return html`<span>Props component with default boolean of <strong>${this.props.hasLoaded}</strong></span>`
  }
})

createComponent('mock-props-default-object', {
  props: {
    config: {
      type: Object,
      default: {
        color: 'warning'
      }
    }
  },
  render () {
    console.log(typeof this.props.config)
    return html`<span>Props component with default object of <strong>${JSON.stringify(this.props.config)}</strong></span>`
  }
})

createComponent('mock-props-required', {
  props: {
    displayString: {
      type: String,
      required: true
    }
  },
  render () {
    return html`<span>Props component with required</span>`
  }
})

createComponent('mock-props-observed', {
  props: {
    displayString: {
      type: String
    }
  },
  render () {
    return html`<span>Props component with observed prop of <strong>${this.props.displayString}</strong></span>`
  }
})

createComponent('mock-props-not-observed', {
  props: {
    displayString: {
      type: String,
      observed: false
    }
  },
  render () {
    return html`<span>Props component with observed prop of <strong>${this.props.displayString}</strong></span>`
  }
})

createComponent('mock-props-multiple-container', {
  state () {
    return {
      loading: false,
      error: null,
      showClosedMatters: true,
      searchResults: [{ id: '1', name: 'Result 1' }, { id: '2', name: 'Result 2' }, { id: '3', name: 'Result 3' }],
      myString: 'my string',
      myNumber: 73,
      myObject: { aProp: 'this is a prop' },
      myArray: ['Item 1', 'Item 2']
    }
  },
  render () {
    return html`<mock-props-multiple class="instance"
                                 apple="Apple"
                                 my-apple="My Apple"
                                 loading=${this.state.loading}
                                 error=${this.state.error}
                                 show-closed-matters=${this.state.showClosedMatters}
                                 results=${JSON.stringify(this.state.searchResults)}
                                 my-string=${this.state.myString}
                                 my-number=${this.state.myNumber}
                                 .myObject=${this.state.myObject}
                                 my-array=${JSON.stringify(this.state.myArray)}
                                 my-second-string="My Second String"
            ></mock-props-multiple>`
  }
})

createComponent('mock-props-multiple', {
  props: {
    apple: {
      type: String,
      observed: true
    },
    myApple: {
      type: String,
      observed: true
    },
    loading: {
      type: Boolean,
      observed: true
    },
    hasLoaded: {
      type: Boolean,
      default: true
    },
    error: {
      type: String,
      observed: true
    },
    results: {
      type: Object,
      observed: true
    },
    showClosedMatters: {
      type: Boolean,
      observed: true
    },
    myString: {
      type: String,
      observed: true
    },
    myNumber: {
      type: Number,
      observed: true
    },
    myObject: {
      type: Object,
      observed: true
    },
    myArray: {
      type: Object,
      observed: true
    },
    mySecondString: {
      type: String,
      observed: true
    }
  },
  render () {
    return html`<div>
<dl>
<dt>apple</dt>
<dd>${this.props.apple}</dd>
<dt>myApple</dt>
<dd>${this.props.myApple}</dd>
<dt>loading</dt>
<dd>${this.props.loading}</dd>
<dt>Has loaded</dt>
<dd>${this.props.hasLoaded}</dd>
<dt>error</dt>
<dd>${this.props.error}</dd>
<dt>results</dt>
<dd><code>${JSON.stringify(this.props.results)}</code></dd>
<dt>showClosedMatters</dt>
<dd>${this.props.showClosedMatters}</dd>
<dt>myString</dt>
<dd id="my-string-prop">${this.props.myString}</dd>
<dt>myNumber</dt>
<dd>${this.props.myNumber}</dd>
<dt>myObject</dt>
<dd id="my-object-prop"><code>${JSON.stringify(this.props.myObject)}</code></dd>
<dt>myArray</dt>
<dd><code>${JSON.stringify(this.props.myArray)}</code></dd>
<dt>mySecondString</dt>
<dd>${this.props.mySecondString}</dd>
</dl>
</div>`
  }
})
