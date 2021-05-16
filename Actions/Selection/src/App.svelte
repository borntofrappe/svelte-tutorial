<script>
  import { selection } from './utils.js';
</script>

<h1>Selection</h1>

<p use:selection>
  Here's a paragraph. You can select parts of it and share it on twitter.
</p>

<p>Here's a paragraph that cannot be shared though. No action included.</p>

<p use:selection>
  <strong>Bonus points:</strong> here's a paragraph with <em>nested</em>
  <abbr title="HyperText Markup Language">HTML</abbr> elements. It took me more time
  than I would cherish to admit, but the action should still work.
</p>

<p use:selection>
  With all that being said, I should give you a quotable text to share in the
  first place. So here it is. In a nicely quotable <code>blockquote</code> element.
</p>

<blockquote use:selection>
  Le foot, c'est comme la politique. C'est toujours plus facile quand il n'y a
  pas des adversaires.
</blockquote>

<style>
  p {
    line-height: 1.5;
  }

  :global(.visually-hidden:not(:focus):not(:active)) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  :global(#selection) {
    display: block;
    position: absolute;
    color: hsl(0, 0%, 98%);
    background: hsl(0, 0%, 20%);
    border-radius: 50%;
    box-shadow: 0 0 2px 0px hsla(0, 0%, 0%, 0.25);
    transform: translate(-50%, -100%);
    width: 1.25rem;
    height: 1.25rem;
    padding: 0.5rem;
  }

  :global(#selection svg) {
    display: block;
    width: 100%;
    height: auto;
    filter: drop-shadow(0 0 10px hsl(0, 0%, 0%));
  }

  ::selection {
    background: hsla(0, 0%, 0%, 0.2);
  }

  blockquote {
    line-height: 1.5;

    margin: 0;
    padding: 0.5rem;
    padding-left: 0.75rem;
    border-left: 0.5rem solid currentColor;
    background: hsla(0, 0%, 0%, 0.1);
  }
</style>
