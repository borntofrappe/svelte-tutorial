export const markdown = `# Svelte Markdown Editor

## [Live Demo]()

## Goal

Create an online editor which allows to compose, preview and download markdown files.

## Notes

I tend to write plenty of markdown files, and [VSCode](https://code.visualstudio.com/) provides an excellent interface for this syntax.

That being said, I'd really like an online alternative. With this project I set out to create such an alternative. It is something which might actually be useful, at least personally, and a perfect excuse to practice with [Svelte](https://svelte.dev) a little bit more.


## Design

The UI is inspired by [Svelte](https://svelte.dev) and [Github](https://github.com). The SVG icons have been coded _by hand_ in VSCode, and use mostly \`<path>\` elements. The following snippet highlights one of
such icons:

\`\`\`html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <g transform="translate(5 5)" stroke-width="10" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" fill="none">
        <path d="M 73 0 l 17 17 -45 45 -17 0 0 -17 45 -45" />
        <path d="M 35 10 h -25 a 10 10 0 0 0 -10 10 v 60 a 10 10 0 0 0 10 10 h 60 a 10 10 0 0 0 10 -10 v -25" />
    </g>
</svg>
\`\`\`

And to top it all off, it is also a good opportunity to include syntax highlighting with [prism.js](https://prismjs.com).
`;

export const markup = `<h1>Svelte Markdown Editor</h1>
<h2><a href="#">Live Demo</a></h2>
<h2>Goal</h2>
<p>Create an online editor which allows to compose, preview and download markdown files.</p>
<h2>Notes</h2>
<p>I tend to write plenty of markdown files, and <a href="https://code.visualstudio.com/">VSCode</a> provides an excellent interface for this syntax.</p>
<p>
    That being said, I'd really like an online alternative. With this project I set out to create such an alternative. It is something which might actually be useful, at least personally, and a perfect excuse to practice with <a href="https://svelte.dev">Svelte</a> a little bit more.
</p>
<h2>Design</h2>
<p>
    The UI is inspired by <a href="https://svelte.dev">Svelte</a> and <a href="https://github.com">Github</a>. The SVG icons have been coded <em>by hand</em> in VSCode, and use mostly <code class="language-html">&lt;path&gt;</code> elements. The following snippet highlights one of
    such icons:
</p>
<pre><code class="language-html">
&lt;svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"&gt;
    &lt;g transform="translate(5 5)" stroke-width="10" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" fill="none"&gt;
        &lt;path d="M 73 0 l 17 17 -45 45 -17 0 0 -17 45 -45" /&gt;
        &lt;path d="M 35 10 h -25 a 10 10 0 0 0 -10 10 v 60 a 10 10 0 0 0 10 10 h 60 a 10 10 0 0 0 10 -10 v -25" /&gt;
    &lt;/g&gt;
&lt;/svg&gt;
    </code></pre>
<p>And to top it all off, it is also a good opportunity to include syntax highlighting with <a href="https://prismjs.com">prism.js</a>.</p>
`;