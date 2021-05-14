---
title: How to manage Internationalization with NextJS SSG
description: Staticaly generating a website with the NextJS framework in different languages is not so obvious.
image: /images/nextjs.jpg
tags:
  - javascript
  - react
  - nextjs
  - i18n
slug: nextjs-ssg-i18n-routing
alternate:
  fr: nextjs-ssg-i18n-routing
featured: true
updated: '2021-03-14'
created: '2021-03-14'
---

Statically generating a website with the NextJS framework in different languages is not so obvious. The framework does not bring clear support for this use case and the [NextJS documentation](https://nextjs.org/docs/advanced-features/i18n-routing#how-does-this-work-with-static-generation) explains that i18n routing is not supported for SSG.

## Bootstrap the project

First of all, let's create a new next project from the `with-react-intl` template

```bash
npx create-next-app -e with-react-intl
```

If don't need anymore to manage any localization client side, you can remove the `getInitialProps` function and the part for localization in the `render` function.

The SSR server is useless if you only need SSG as well. So you can remove server tsconfig, `server.ts` file and change your `package.json` file script part as follow :

```json
  "scripts": {
    "dev": "next dev",
    "build": "npm run extract:i18n && npm run compile:i18n && next build",
    "export": "next export",
    "extract:i18n": "formatjs extract '{pages,components}/*.{js,ts,tsx}' --format simple --id-interpolation-pattern '[sha512:contenthash:base64:6]' --out-file lang/en.json",
    "compile:i18n": "formatjs compile-folder --ast --format simple lang compiled-lang",
    "start": "next start"
  },
```

## Static Site Generation (aka SSG) with NextJS

When you generate your website statically, it is not possible to use browser request header or any other information from the browser to know which language to use.

We need to introduce a new environment variable `NEXT_LOCALE` which will contain the locale of the website generated during the export process.

Example of content in `.env.*` file

```
NEXT_LOCALE=en
```

You can now use the `NEXT_LOCALE` variable in your `_app.tsx` file in the `getInitialProps` function to define the locale.

```ts
const getInitialProps: typeof App.getInitialProps = async (appContext) => {
  const locale = appContext.router.locale || process.env.NEXT_LOCALE
  const [supportedLocale, messagePromise] = getMessages(locale)

  const [, messages, appProps] = await Promise.all([
    polyfill(supportedLocale),
    messagePromise,
    App.getInitialProps(appContext),
  ])

  return {
    ...(appProps as any),
    locale: supportedLocale,
    messages: messages.default,
  }
}
```

Thanks to this variable and the change done, `react-intl` will now use as locale the content from the env variable. The translated messages taken are now from the right locale.

Now you have a website available for multiple languages. You can build your website for multiple domains as well dealing with multiple build processes, one for each locale. Feel free to implement it with the service you want like Netlify, Vercel, ... etc

The showcase generated for two languages deployed with Vercel :

- [English](https://next-showcase-ssg-en.vercel.app/)
- [French](https://next-showcase-ssg-fr.vercel.app/)

If you want to know more, have a look into the [Source Code](https://github.com/emmanuelgautier/nextjs-showcase/tree/main/packages/ssg-i18n-routing)
