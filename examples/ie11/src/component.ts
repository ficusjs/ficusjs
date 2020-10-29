import { createComponent } from 'ficusjs/dist/component'
import { html, renderer } from 'ficusjs-renderers/dist/uhtml'

createComponent('stock-items', {
  renderer,
  state () {
    return {
      products: []
    }
  },
  mounted () {
    window.fetch('products.json')
      .then(res => res.json())
      .then(data => {
        this.state.products = data
      })
  },
  computed: {
    totalProducts () {
      return this.state.products.reduce((sum, product) => {
        return sum + product.quantity
      }, 0)
    }
  },
  add (id) {
    const products = [...this.state.products]
    const product = products.find(p => p.id === id)
    product.quantity += 1
    this.state.products = products
  },
  render () {
    return html`
        <ul>
          ${this.state.products.map(product => html`
            <li>
              ${product.quantity} ${product.name}
              <span>
                ${product.quantity === 0 ? ' - OUT OF STOCK' : ''}
              </span>
              <button type="button" onclick="${() => this.add(product.id)}">Add</button>
            </li>
          `)}
        </ul>
        <h2>Total inventory: ${this.totalProducts}</h2>
      `
  }
})
