export function selection(node, params) {
  if (!getSelection()) return;

  let x;
  let y;

  function handleMouseup() {
    if (!getSelection().isCollapsed) {
      const {
        commonAncestorContainer,
        startContainer,
        endContainer,
        startOffset,
        endOffset,
      } = getSelection().getRangeAt(0);

      if (
        node === commonAncestorContainer ||
        [...node.childNodes].includes(commonAncestorContainer)
      ) {
        let text;
        if (startContainer === endContainer) {
          text = startContainer.textContent.slice(startOffset, endOffset);
        } else {
          const nodes = [...node.childNodes];
          const startIndex = nodes.findIndex(
            n => n.textContent === startContainer.textContent
          );
          const endIndex = nodes.findIndex(
            n => n.textContent === endContainer.textContent
          );

          const midContainers = nodes.slice(startIndex + 1, endIndex);

          text =
            startContainer.textContent.slice(startOffset) +
            midContainers.map(c => c.textContent).join('') +
            endContainer.textContent.slice(0, endOffset);
        }

        text = text.trim();
        if (text) {
          const child = document.createElement('a');
          child.setAttribute('id', 'selection');
          child.innerHTML = `<span class="visually-hidden">Share selection</span><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100" width="1em" height="1em">
  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path stroke-width="8" d="M -39 30.5 c 40 20 75 0 75 -48 l 8 -8 -12 -2 a 10 10 0 0 0 -32.5 12 q -20 5 -40 -15" />
    <path stroke-width="7" d="M -40.5 -30.5 q -5 20 14 26 -9 0 -18 -5 0 20 23 18 -10 4 -22 0 0 12 28 14 -10 6 -23.5 8" />
  </g>
</svg>`;
          child.style.left = `${x}px`;
          child.style.top = `${y}px`;
          child.setAttribute(
            'href',
            `https://twitter.com/intent/tweet?text=${text}`
          );
          document.querySelector('body').appendChild(child);
        }
      }
    }

    node.removeEventListener('mouseup', handleMouseup);
    window.removeEventListener('mouseup', handleMouseup);
    window.addEventListener('mousedown', removeSelection);
    window.addEventListener('resize', removeSelection);
    node.addEventListener('mousedown', handleMousedown);
  }

  function removeSelection() {
    if (document.querySelector('#selection')) {
      getSelection().empty();
      document
        .querySelector('body')
        .removeChild(document.querySelector('#selection'));
    }
    window.removeEventListener('mousedown', removeSelection);
    window.removeEventListener('resize', removeSelection);
  }

  function handleMousedown({ pageX, pageY }) {
    x = pageX;
    y = pageY;

    node.addEventListener('mouseup', handleMouseup);
    window.addEventListener('mouseup', handleMouseup);
    node.removeEventListener('mousedown', handleMousedown);
  }

  node.addEventListener('mousedown', handleMousedown);
  return {
    onDestroy() {
      node.removeEventListener('mousedown', handleMousedown);
    },
  };
}
