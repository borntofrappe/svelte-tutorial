<script>
  import { append } from './utils.js';
</script>

<h1 use:append={'!!!'}>Append</h1>

<p>
  How are you <em use:append={' fine'}>this</em> day?
</p>

<p>
  If you hover on <strong use:append={' (like this one)'}
    >specific elements</strong
  >, you see how the <code>:use</code> directive is used to manipulate the existing
  DOM.
</p>
