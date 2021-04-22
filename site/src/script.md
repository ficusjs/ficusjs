---
layout: main.njk
title: FicusJS documentation - Script loader
---
# FicusJS script loader

Looking for a lightweight script loader for lazy loading ES modules and ES5 scripts or both based on dynamic paths?

[Try FicusJS script loader!](https://script.ficusjs.org)

## Features

- Lazy load ES modules
- Lazy load ES5 scripts
- Dynamically load based on path
- Functional programming patterns
- Small footprint (1.3 KB gzipped for everything!)
- No dependencies
- Works with client-side frameworks

## Getting started

The easiest way to try out FicusJS script loader is using a simple example.

Create an `index.html` file and copy the following between the `<body>` tags.

```html
<div id="content"></div>

<script type="module">
import { loadScript } from 'https://cdn.skypack.dev/@ficusjs/script@2'
const markdownToRender = `# FicusJS script loader

Dynamically load ES modules and ES5 scripts.

- Lazy load ES modules
- Lazy load ES5 scripts
- Dynamically load based on path
- Functional programming patterns
- Small footprint (1.3 KB gzipped for everything!)
- No dependencies
- Works with client-side frameworks
`

// load the ES module for marked
loadScript('https://unpkg.com/marked@1.2.0/lib/marked.esm.js')
  .then(mod => mod.default)
  .then(marked => {
    const content = document.getElementById('content')
    content.innerHTML = marked(markdownToRender)
  })
</script>
```

> Alternatively, fork this Codepen to see it in action - [https://codepen.io/ducksoupdev/pen/abZbdbq](https://codepen.io/ducksoupdev/pen/abZbdbq)

The example imports the [marked](https://www.npmjs.com/package/marked) ES module and converts some markdown to HTML.
