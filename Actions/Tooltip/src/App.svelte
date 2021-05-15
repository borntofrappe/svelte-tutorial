<script>
  import { tooltip } from './utils.js';
</script>

<!--
<svg width="1em" height="1em" viewBox="-50 -50 100 100">
	<g fill="none" stroke="currentColor"  stroke-linecap="round">
		<path stroke-width="8" d="M -13 -13 m 0 -10 v 20 m 10 -10 h -20" />
		<g stroke-width="14">
			<circle r="30" cx="-13" cy="-13" />
			<path d="M 24 24 l 18 18" />
		</g>
	</g>
</svg>
-->

<h1>Tooltip</h1>

<p>
  The idea is to show <span use:tooltip={'more!'}>more</span> information when hovering
  on specific elements.
</p>

<p>
  An icon describing a <span use:tooltip={'like this very one'}
    >magnifying glass</span
  >, that would be a bonus.
</p>

<p>
  Keyboard focus would be icing on the cake. <span use:tooltip={'Or this one'}
    >That</span
  > would be a real treat.
</p>

<style>
  :global(.tooltip) {
    position: relative;
    padding-top: 0.35rem;
    border-bottom: 1px solid currentColor;
    cursor: zoom-in;
    white-space: nowrap;
  }

  :global(.tooltip::after) {
    margin: 0 0.15rem 0 0.25rem;
    content: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="-50 -50 100 100"%3E%3Cg fill="none" stroke="hsl(0, 0%25, 30%25)" stroke-linecap="round"%3E%3Cpath stroke-width="8" d="M -13 -13 m 0 -10 v 20 m 10 -10 h -20" /%3E%3Cg stroke-width="14"%3E%3Ccircle r="30" cx="-13" cy="-13" /%3E%3Cpath d="M 24 24 l 18 18" /%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
  }

  :global(#tooltip) {
    position: absolute;
    bottom: 100%;
    /* 0.63 + 0.15 */
    right: 0.78rem;
    transform: translate(50%, 0);
    padding: 0.2rem 0.35rem;
    background: hsl(0, 0%, 20%);
    color: hsl(0, 0%, 98%);
    font-size: 0.95em;
    border-radius: 0.25rem;
    filter: drop-shadow(0 1px 2px hsla(0, 0%, 0%, 0.2));
    width: max-content;
  }

  :global(.tooltip:not(:focus) #tooltip::before) {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0.6em;
    height: 0.25em;
    background: inherit;
    clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
  }
</style>
