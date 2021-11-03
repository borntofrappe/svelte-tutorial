# Single Page App

Every project in this repository tries to showcase Svelte and its features. Here, however, I am interested in two frameworks leaning on Svelte to build full-fledged applications: [Sapper](https://sapper.svelte.dev/) and [SvelteKit](https://kit.svelte.dev/).

SvelteKit is fundamentally the evolution of Sapper, and the soon-to-be recommended way to develop applications with Svelte from the Svelte team itself. That being said, I consider the exercise of using both frameworks useful to:

1. get acquainted with an application with multiple routes; the folder structure is largery similar for both projects

2. highlight the improvements proposed by the new framework

## Project

Inspired by [this Sapper Tutorial from _The Net Ninja_](https://youtube.com/playlist?list=PL4cUxeGkcC9gdr4Qhx83gBBcID-KMe-PQ), the goal is to develop a single page app highlighting a series of demos built with Svelte. Just like in the tutorial, the application focuses on a few routes — home, demos, about — and a few components — nav, footer, card. A set of demos is included from a server route, but it is also possible to add new links with a form. This last feature is however and mostly tentative, and works just to illustrate how to perform a POST request; a complete application would bother sanitizing the input, making sure the form receives valid strings for the different fields.

## Sapper

[The documentation](https://sapper.svelte.dev/docs#Getting_started) illustrates the instructions necessary to set up a project with a basic template.

```bash
npx degit "sveltejs/sapper-template#rollup" sapper
cd sapper
npm install
```

The starter project already explains the app structure in detail, but here a few notes helpful to understand the demo.

- the `static` folder includes assets which are:

  1. served publicly

  2. available from the home route; for instance, the icon `icon.svg` is accessed through `/icon.svg`

- the `src` folder includes the code ultimately responsible for the application

  - through `src/routes`, the app defines **pages** and **server routes**

    Pages are `.svelte` files. For every `.svelte` file there exist a route in the application. `about.svelte`, for instance, creates a page for the `/about` path

    Server routes are `.js` files useful to provide data and generate pages

  - in `src/components` the project specifies reusable components

  - `template.html` describes the `.html` file where the framework injects the necessary markup.

  - `client.js` and `server.js` detail how the framework works on the client and on the server respectively.

    On the client side, the framework injects the markup in the `#sapper` container.

    On the server side, the framework sets up a server with polka and serves the application and the static files.

### layout

A `_layout` file provides every page rely on consistent markup/stylesheet. In the project, it allows to repeat the navigation and footer components for each and every page.

### Underscore

Svelte knows to skip files beginning with an underscore in order to create routes. This explains why `_layout.svelte` and `_error.svelte` do not imply a `/layout` or a `/error` page.

### Routes

Creating a route is a matter of adding a `.svelte` file. When receiving a request with a particular URL, say `/demos`, Svelte will look for the following files:

- `demos.svelte`, immediately at the root of the `routes` folder

- `demos/index.svelte`, in a dedicated folder

- `demos/[something].svelte`, with a page generated dynamically (more on this later)

### Demos — Static

The `demos` folder illustrates how to generate pages comes from data retrieved from a local file.

- `_data.js` provides a few demos with a series of fields

- `index.json.js` defines a `get` function which is invoked as an answer to a `fetch` request (more on this soon)

  In the specific demo, the `get` function returns a JSON object based on the imported data

  ```js
  import { demos } from "./_data.js";

  export function get(req, res, next) {
    res.end(JSON.stringify(demos));
  }
  ```

- `index.svelte` first performs a `fetch` request in a `<script>` element with a `context` attribute set to `module`. The script runs before the eventual `<script>` element receiving the demos.

  The `fetch` request is performed for `demos.json`, which in the specific project directs toward The data provided through `demos/index.json.js`

  ```js
  <script context="module">
    export async function preload() {
      const res = await this.fetch('demos.json');
      const demos = await res.json();
    }
  </script>
  ```

  The demos are then returned to have the `<script>` element receive the array as a prop.

  ```js
  return {
    demos,
  };
  ```

- `index.svelte` receives the demos as a prop and finally loops through the array to include one `<article>` for each demo

  ```html
  <script>
    export let demos;
  </script>

  <section>
    {#each demos as demo}
    <article>
      <h2>{demo.title}</h2>
      <!-- ... -->
    </article>
    {/each}
  </section>
  ```

  The data is ultimately shown with a `<Card />` component, but the way the information is retrieved remains the same

### Demos — Dynamic

The idea is to here expand each demo in a dedicated page, like `demos/0` or `demos/1`, with more details for a selected project. The effect is achieved through `[id].svelte` and `[id].json.js` respectively.

Files using square brackets allow to retrieve the content from an endpoint. When visiting `demos/0`, for instance, `[id].svelte` is able to retrieve the number `0`.

```html
<script context="module">
  export async function preload(page) {
    const { id } = page.params;
  }
</script>
```

The label included in between brackets is provided in the `page.params` object, highlighting key information regarding the page. To illustrate the point, it would be possible to generate a page for any endpoint by using the id.

```html
<script context="module">
  export async function preload(page) {
    const { id } = page.params;

    return {
      id,
    };
  }
</script>

<script>
  export let id;
</script>

<h1>{id}</h1>
```

That being said, the goal is to create a page for _existing_ demos. Similarly to how `index.svelte` performs a fetch request for the set of demos, `[id].svelte` performs a fetch request for an individual file.

```js
const res = await this.fetch(`demos/${id}.json`);
```

If the request provides a valid response (a status code of `200`), the script then returns the demo to generate the page.

```html
if (res.status === 200) { const demo = await res.json(); return { ...demo, }; }
```

If the resource is not available (a status code of `404`), Svelte is instructed to highlight the mishap through the `_error.svelte` component, by calling `this.error` with the error code and message.

```js
else if (res.status === 404) {
  const { error } = await res.json();
  this.error(404, error);
}
```

The request is processed through `[id].json.js`, similarly to `index.json.js`, but for a single demo. The file defines a `get` function which considers the `id` received through the fetch request.

```js
import { demos } from "./_data.js";

export function get(req, res, next) {
  const { id } = req.params;
}
```

Based on the `id` and whether the `demos` array has an item with a matching value, the function responds with the data in JSON format.

```js
const demo = demos.find((d) => d.id === parseInt(id, 10));

if (demo) {
  res.setHeader("Content-Type", "applications/json");
  res.end(JSON.stringify(demo));
}
```

Alternatively, without a matching value, the script responds with a `404` message.

```js
else {
  res.statusCode = 404;
  res.end(JSON.stringify({ error: 'Demo not found'}));
}
```

### Demos — Post

The idea is to have a way for the application to add new demos to the existing set. `demos/add.svelte` is included with a form and a series of fields, capturing the files necessary to describe the demo — title, description, link and details.

The input is not processed in any sort of way, which means the feature is by considerably flawed. However, the logic is helpful to illustrate how to handle a POST request.

Following the `submit` event, the `handleSubmit` function performs a POST request with the necessary fields.

```js
fetch("demos.json", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title, description, details, href }),
});
```

The request is performed by `app.svelte`, and is processed in `index.json.js` with a `post` function. It is however necessary to first install `body-parser`, to process the request with a `json` function.

```js
import { json } from "body-parser";

polka() // You can also use Express
  .use(
    json()
    // other middleware
  );
// listen
```

Processed to a JavaScript object, the information received through `req` is included in the `demos` array.

```js
export function post(req, res, next) {
  const { title, description, details, href } = req.body;
  demos.push({ title, description, details, href, id: demos.length });
}
```

As the fetch request is performed, it is finally helpful to redirect the user to the specific demo. The `sapper` library provides a `goto` method for such an instance.

```html
<script>
  import { goto } from "@sapper/app";

  // find id of the most recent demo
  goto(`demos/${id}`);
</script>
```

## SvelteKit

[The documentation](https://kit.svelte.dev/docs#introduction-getting-started) describes the instructions necessary to set up a sveltekit environment. There is a special mention to the `@next` suffix, which at the time of writing is meant to be temporary.

```bash
mkdir sveltekit
cd sveltekit
npm init svelte@next
```

The initialization is performed through a series of questions, which are answered in the following manner:

- no to TypeScript

- CSS for styling

- yes to eslint

- yes to prettier

The folder structure is eerily similar to that of sapper with a `static` and `src` folder. However, components are saved in a `lib` directory, and there is no file describing the behavior of the application on the server and on the client. This last omission is due to the fact that SvalteKit drops the rollup bundler in favor of vite.

### Nav

`<Nav>` is updated in how the component retrieves the information regarding the current page, the `segment` variable. The layout file does not receive a `segment` property, and the value is instead retrieved from the page and the `$app/stores` module.

```js
import { page } from "$app/stores";
```

`page` describes a readable store with information regarding the page. `$page` details an object with various fields, among which `path`, which describes the URL.

```js
<a aria-current={$page.path === "/" ? "page" : undefined} href="/">
  home
</a>
```

### Dollar sign

The dollar sign `$` in a string works as a convenient way to refer to a file in the `src` folder.

```js
import Nav from "$lib/Nav.svelte";
```

### load

The functionality included in the `preload` function is now included in a `load` function.

```js
<script context="module">export async function load() {}</script>
```

Once more, the script with a `context` attribute of type `module` runs before the regular script for the component.

### fetch

A fetch request is performed with a method made available through the `load` function.

```js
export async function load({ fetch }) {}
```

### get demos

A `get` function responds to a fetch request by receiving an object with several fields

```js
export function get(res) {
  /* {
      host, 
      method, 
      headers: { cookie, authorization }, 
      path, 
      body, 
      query, 
      params, 
      context
    }
  */
}
```

It is possible to pass extra information through the various fields, but to retrieve the set of demos, there is no need to specify any value.

Most importantly, the data returned by the `get` function is included in an object with a field `body`.

```js
return {
  body: {
    demos,
  },
};
```

It is then enough to destructure the information from the response.

```js
export async function load({ fetch }) {
  const res = await fetch("demos.json");
  const { demos } = await res.json();
}
```

### props

Props from the `load` function are passed to a component in an object with a field of `props`.

```js
return {
  props: {
    demos,
  },
};
```

### get demo

To retrieve the data for a specific demo I've implemented two different approaches:

1. perform a fetch request to a custom `.json` file

   ```js
   const res = await fetch(`/demos/${id}.json`);
   ```

   The approach works similarly to the sapper demo, where a `[id].json.js` file receives the `id` through the `params` object.

   ```js
   export function get({ params }) {
     const { id } = params;
     // find demo
   }
   ```

2. perform a fetch request to `index.json.js`, but with a query parameter

   ```js
   const res = await fetch(`/demos.json?id=${id}`);
   ```

   Here the idea is to modify the `get` method responsible for returning the entire set of demos. When the function receives a `query`, the `id` is retrieved with the `query.get` function to find the specific demo.

   ```js
   export function get({ query }) {
     if (query.has("id")) {
       const id = query.get("id");
       // find demo
     }

     // no query, return the demos
   }
   ```

### goto

The `goto` method is available from `$app/navigation` module.

```js
import { goto } from "$app/navigation";
```

### prefetch

The `rel` attribute with a type of `prefetch` is substituted with a syntax custom to the kit, and specifically with `sveltekit:pretch`.

```html
<!-- <a rel="prefetch"href="demos/{id}">Check out more</a> -->
<a sveltekit:prefetch href="demos/{id}">Check out more</a>
```

### post

The post request is implemented exactly as in the sapper demo, and is actually an opportunity to realize how the `fetch` method is not included through the library, but through the `window` object.

```js
fetch("/demos.json", {});
```

The instruction doesn't result in an error because the code runs as a result of a `submit` event, and therefore only on the client side.

## Update

I revisited the project to ensure that:

1. the sapper demo has a `package-lock.json` file

2. the sveltekit demo refers to the version of the kit available at the time of the project

   ```json
   {
     "devDependencies": {
       "@sveltejs/adapter-node": "1.0.0-next.12",
       "@sveltejs/kit": "1.0.0-next.71"
     }
   }
   ```

   Without this specific mention the risk is to install versions with breaking changes.
