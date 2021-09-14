---
layout: main.njk
title: FicusJS documentation - Renderers
---
# Renderers

Renderers allow any [tagged template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) renderer to be plugged into a component for generating HTML.

The following renderers are available as minified bundles.

- [htm](https://www.npmjs.com/package/htm) (JSX-like syntax - no transpiler necessary) - 923 B gzipped
- [htm](https://www.npmjs.com/package/htm) with [Preact](https://www.npmjs.com/package/preact) (JSX-like syntax - no transpiler necessary) - 4.3 KB gzipped
- [lit-html](https://www.npmjs.com/package/lit-html) - 3.61 KB gzipped
- [uhtml](https://www.npmjs.com/package/uhtml) (default) - 3.02 KB gzipped

## Minified ES module renderers

The [`@ficusjs/renderers`](https://www.npmjs.com/package/@ficusjs/renderers) package provides a tested set of renderers as ES modules to make working with them much easier.
