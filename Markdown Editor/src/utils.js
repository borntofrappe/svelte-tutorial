const initialValue = `# Svelte Markdown Editor

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


// utility function returning the initial value for markdown
// using the value in local storage or the default value described above
export function getInitialValue() {
    return fromLocalStorage('markdown--string') || initialValue;
}

// utility function returning a value from local storage
function fromLocalStorage(key) {
    const val = localStorage.getItem(key);
    return localStorage.getItem(key);
}
// utility function storing the existing string of markup in local storage
export function toLocalStorage(string) {
    localStorage.setItem('markdown--string', string);

}