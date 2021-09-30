# FicusJS

<img src="img/ficus-icon-optimised.svg" alt="FicusJS" width="150" align="right">

FicusJS is a set of lightweight functions for developing modern web applications using web components.

## Features

FicusJS provides the following features for building modern web applications.

- Fast lightweight web components
- Extending web components
  - with renderers
  - with local state
  - with styles
  - with lazy rendering
  - with a state machine
  - with an XState service
  - with an application state store
  - with an event bus
- Fast lightweight publish/subscribe event bus
- Fast lightweight stores for managing application state

## Documentation

See the [full documentation](https://docs.ficusjs.org).

## Getting started

The easiest way to try out FicusJS is using a hello world example.

Create an `index.html` file and copy the following between the `<body>` tags.

```html
<hello-world></hello-world>

<script type="module">
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@4/htm'
import { createCustomElement } from 'https://cdn.skypack.dev/ficusjs@3/custom-element'

createCustomElement('hello-world', {
  renderer,
  handleClick () {
    window.alert('Hello to you!')
  },
  render () {
    return html`
    <div>
      <p>FicusJS hello world</p>
      <button type="button" onclick="${this.handleClick}">Click me</button>
    </div>
  `
  }
})
</script>
```

Alternatively, fork this Codepen to see it in action - [https://codepen.io/ducksoupdev/pen/GRZPqJO](https://codepen.io/ducksoupdev/pen/GRZPqJO)

The hello world example creates a new [custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) using the `createCustomElement` function and registers it to the `hello-world` tag. It uses the [htm](https://www.npmjs.com/package/htm) JSX-like renderer ([other renderers are available](https://docs.ficusjs.org/renderers/)) for creating HTML from [tagged template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

Once registered, the tag can be used multiple times in HTML and instances can be programmatically obtained using [`document.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
or [`element.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector).

## Installation

FicusJS can be installed in a number of ways.

### CDN

We recommend using native ES modules in the browser.

```html
<script type="module">
  import { createCustomElement } from 'https://cdn.skypack.dev/ficusjs@3/custom-element'
</script>
```

FicusJS is available on [Skypack](https://www.skypack.dev/view/ficusjs).

### NPM

FicusJS works nicely with build tools such as Snowpack, Webpack or Rollup. If you are using a NodeJS tool, you can install the NPM package.

```bash
npm install ficusjs
```

### Available builds

FicusJS only provides ES module builds. For legacy browsers or alternative modules such as CommonJS, it is recommended to use a build tool to transpile the code.

## Development

How to set-up FicusJS for local development.

1. Clone the repository:

```bash
git clone https://github.com/ficusjs/ficusjs.git
```

2. Change the working directory

```bash
cd ficusjs
```

3. Install dependencies

```bash
npm install # or, yarn install
```

4. Run the local development server

```bash
npm run dev # or, yarn dev
```

That's it! Now open http://localhost:8080 to see a local app.

## License

This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details.

## Contributing to FicusJS

Any kind of positive contribution is welcome! Please help us to grow by contributing to the project.

If you wish to contribute, you can work on any features you think would enhance the library. After adding your code, please send us a Pull Request.

> Please read [CONTRIBUTING](CONTRIBUTING.md) for details on our [CODE OF CONDUCT](CODE_OF_CONDUCT.md), and the process for submitting pull requests to us.

## Support

We all need support and motivation. FicusJS is not an exception. Please give this project a ⭐️ to encourage and show that you liked it. Don't forget to leave a star ⭐️ before you move away.

If you found the library helpful, please consider [sponsoring us](https://github.com/sponsors/ficusjs).
