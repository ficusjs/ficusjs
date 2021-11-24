---
layout: main.njk
title: FicusJS documentation - Internationalization (i18n) and localization
---
# Internationalization (i18n)

FicusJS provides functions for internationalization (i18n) and localization in components.

```js
i18n.add({
    projectTitle: 'Project title',
    button: {
        text: 'Click me $userName!',
        caption: 'Please click me!'
    },
    itemsCaption: [
        '$count item',
        '$count items'
    ],
    deep: {
        nested: {
            label: 'Deep nested label'
        }
    }
})

// get translations
i18n.t('projectTitle') // outputs  "Project title"
i18n.t('button.text', { userName: 'George' }) // outputs  "Click me George!"
i18n.t('button.caption') // outputs  "Please click me!"
i18n.t('itemsCaption', { count: 1 }) // outputs  "1 item"
i18n.t('itemsCaption', { count: 2 }) // outputs  "2 items"
i18n.t('deep.nested.label') // outputs  "Deep nested label"
```
