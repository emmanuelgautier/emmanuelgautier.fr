---
title: How to get a React element as an HTML string
description: For use cases, you may want to have the generated HTML string from your React component instead of a mounted component rendered on the page. The simplest way is to use the renderToString function provided by the react-dom package.
image: /images/nextjs.jpg
tags:
  - javascript
  - react
slug: react-element-render-to-string
alternate:
  fr: rendre-element-react-string
featured: false
updated: '2021-05-02'
created: '2021-05-02'
---

For use cases, you may want to have the generated HTML string from your React component instead of a mounted component rendered on the page.

The simplest way is to use the `renderToString` function provided by the `react-dom` package :
```jsx
import { renderToString } from 'react-dom/server'

renderToString(<YourAwesomeComponent props1="value1" props2={{ value: "2" }} />)
```

The function `renderToString` can be used on both the server-side and client-side.

If you want to render all page server-side for SEO or UX purposes for example, you can use the function `renderToNodeStream` to improve your load time. 

More informations on the React [documentation](https://reactjs.org/docs/react-dom-server.html).
