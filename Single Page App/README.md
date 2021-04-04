# Single Page App

Every project in this repository tries to showcase Svelte and its features. Here, however, I am interested in two frameworks leaning on Svelte to build full-fledged applications: [Sapper](https://sapper.svelte.dev/) and [SvelteKit](https://kit.svelte.dev/).

SvelteKit is fundamentally the evolution of Sapper, and the soon-to-be recommended way to develop applications with Svelte from the Svelte team itself. That being said, I consider the exercise of using both frameworks useful to:

1. get acquainted with an application with multiple routes; the folder structure is largery similar for both projects

2. highlight the improvements proposed by the new framework

## Project

Inspired by [this Sapper Tutorial](https://youtube.com/playlist?list=PL4cUxeGkcC9gdr4Qhx83gBBcID-KMe-PQ), the goal is to develop a single page app highlighting a series of demos built with Svalte. Similarly to the tutorial, the application focuses on a home page and a page dedicated to demos. A series of demos are included from a server route, and it is furthermore possible to add new links with a form.

## Sapper

```bash
npx degit "sveltejs/sapper-template#rollup" sapper
cd sapper
npm install
```

The `README.md` file included with the starter project already provides helpful information regarding the app structure.

### static

The folder includes static assets which are:

1. served publicly

2. available from the home route; for instance and for the icon `icon.svg`, this is accessed through `/icon.svg`

### src

The folder includes the code ultimately responsible for the application.

- through `src/routes`, the app defines **pages** and **server routes**

  Pages are `.svelte` files. For every `.svelte` file there exist a route in the application. `about.svelte`, for instance, creates a page for the `/about` path

  Server routes are `.js` files.

- in `src/components` the project specifies reusable components

- `template.html` describes the `.html` file where the framework injects the necessary markup.

- `client.js` and `server.js` describe how the framework works on the client and on the server respectively.

  On the client side, the framework injects the markup in the `#sapper` container.

  On the server side, the framework sets up a server with polka and serves the application and the static files.

## Resources

- [Sapper](https://sapper.svelte.dev/)

- [SvelteKit](https://kit.svelte.dev/)

- [Sapper Tutorial from _The Net Ninja_](https://youtube.com/playlist?list=PL4cUxeGkcC9gdr4Qhx83gBBcID-KMe-PQ)
