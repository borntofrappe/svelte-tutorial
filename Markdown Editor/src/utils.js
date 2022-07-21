// string used as a fallback in case local storage doesn't have a saved value
const initialValue = `# Svelte Markdown Editor

## Goal

Create an online editor which allows to compose and preview markdown files.

## Notes

I tend to write plenty of markdown files, and while [VSCode](https://code.visualstudio.com/) provides an excellent interface, I'd really like an online alternative for this syntax.

Enter this project. It is something which might actually be useful, at least personally, and a perfect excuse to practice with [Svelte](https://svelte.dev).

## Design

The UI is inspired by [Svelte's own REPL](https://svelte.dev/repl). The icons have been coded _directly_ in VSCode, stressing over the \`d\` attribute of \`path\` elements.

Take this one for instance.

\`\`\`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <g transform="translate(5 5)" stroke-width="10" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" fill="none">
    <path d="M 73 0 l 17 17 -45 45 -17 0 0 -17 45 -45" />
    <path d="M 35 10 h -25 a 10 10 0 0 0 -10 10 v 60 a 10 10 0 0 0 10 10 h 60 a 10 10 0 0 0 10 -10 v -25" />
  </g>
</svg>
\`\`\`

Can you guess which icon is behind this snippet?

## Script

Aside from those stylish icons, the project uses:

- [marked.js](https://github.com/markedjs/marked) to parse between markdown and markup
- [DOMPurify](https://github.com/cure53/DOMPurify) for a wee bit o' sanitation.

There are also a couple of niceties to rapidly append code blocks or the syntax for a URL.

It's far from perfect, but to create **README.md** files is already a jump in the right direction.
`;

// utility function returning the initial value for markdown
// using the value in local storage or the default value described above
export function getInitialValue() {
    return fromLocalStorage('markdown--string') || initialValue;
}

// utility function returning a value from local storage
function fromLocalStorage(key) {
    return localStorage.getItem(key);
}

// utility function storing the existing string of markup in local storage
export function toLocalStorage(string) {
    // sanitize the string with dompurify
    localStorage.setItem('markdown--string', DOMPurify.sanitize(string));
}