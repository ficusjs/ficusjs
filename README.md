# FicusJS

<img src="img/ficusjs.svg" alt="FicusJS" width="200" align="right">

FicusJS is a set of lightweight functions for developing applications using web components.

- A function for creating fast, lightweight web components
- A function for creating fast, lightweight stores for application state
- A function for creating a fast, lightweight publish/subscribe events bus

## Usage

See the [full documentation](docs).

### Going build-less

Browsers have improved a lot over the past years. It's now possible to do web development without requiring any build tools, using the native module loader of the browser. We think this is a great fit for FicusJS, and we recommend this as a general starting point.

Build tools can quickly add a lot of complexity to your code, and make your code reliant on a specific build setup. We think it's best to avoid them during development, or only add them for light transformations if you know what you're doing.

[Read this article](https://dev.to/open-wc/developing-without-a-build-1-introduction-26ao) to learn more about this approach.

If your project is using an existing build tool, FicusJS is fully compatible and can work alongside other libraries and frameworks.

### Legacy browsers

FicusJS uses modern Javascript (ES6+) but can be transpiled to work with legacy browsers.

See [the examples](examples) directory.

## Why ficus?

Ficus trees are a common plant in the home and office, mainly because they look like a typical tree with a single trunk which spreads into a canopy of leaves.
This is similar to a web application with a spread of web components.
