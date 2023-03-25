export function createTable ({ createCustomElement, html, renderer }) {
  createCustomElement('data-table', {
    props: {
      data: {
        type: Array
      }
    },
    renderer,
    render () {
      return html`
        <table class="white-borders w-full">
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Country</th>
          </tr>
          ${this.props.data.map(contact => html`
            <tr>
              <td>${contact.name}</td>
              <td>${contact.company}</td>
              <td>${contact.country}</td>
            </tr>
          `)}
        </table>
      `
    }
  })
}
