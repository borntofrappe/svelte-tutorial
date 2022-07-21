export function append(node, params) {
  function handleMouseLeave() {
    node.removeChild(node.querySelector('span'));
    node.removeEventListener('mouseleave', handleMouseLeave);
  }

  function handleMouseEnter() {
    const child = document.createElement('span');
    child.textContent = params;
    node.appendChild(child);
    node.addEventListener('mouseleave', handleMouseLeave);
  }

  node.addEventListener('mouseenter', handleMouseEnter);

  return {
    destroy() {
      node.removeEventListener('mouseenter', handleMouseEnter);
    },
  };
}
