# template

I repeat a few of steps when creating a project for [borntofrappe/svelte/tutorial](https://github.com/borntofrappe/svelte-tutorial):

1. clone `sveltejs/template` with `degit` as instructed on [svelte.dev](https://svelte.dev)

2. remove most of the styling in the global stylesheet

3. remove `favicon.png` in favor of `icon.svg`

4. remove most of the content in `App.js`

5. remove the props passed to the `<App />` component from `index.js`

This folder is my attempt at a shortcut to step 6, developing an interesting demo.

## Clone

```bash
npx degit https://github.com/borntofrappe/svelte-tutorial/template svelte-app
```

## Set up

```bash
cd svelte-app
npm install
```

## Run

```bash
npm run dev
```
