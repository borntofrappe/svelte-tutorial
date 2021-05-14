export function lazy(node, params) {
  function observation(entries) {
    if (!entries[0].isIntersecting) return;
    node.setAttribute('alt', 'A cute dog');
    // node.setAttribute('src', node.getAttribute('data-src'))
    node.src = node.dataset.src;
    observer.unobserve(node);
  }

  const observer = new IntersectionObserver(observation, params);

  observer.observe(node);

  return {
    onDestroy() {
      observer.unobserve(node);
    },
  };
}

export function lazyAll(node, params) {
  function observation(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const { target } = entry;
      target.setAttribute('alt', 'A cute dog');
      target.src = target.dataset.src;
      observer.unobserve(target);
    });
  }

  const observer = new IntersectionObserver(observation, params);

  const imgs = node.querySelectorAll('img');
  imgs.forEach(img => observer.observe(img));

  return {
    onDestroy() {
      imgs.forEach(img => observer.unobserve(img));
    },
  };
}
