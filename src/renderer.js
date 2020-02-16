export default (classPrefix = '') =>
  function createElement(tagIdClasses, props = {}, children = []) {
    if (
      props instanceof Node ||
      typeof props === 'string' ||
      Array.isArray(props)
    ) {
      children = props;
      props = {};
    }
    if (children && !Array.isArray(children)) children = [children];

    const [tagId, ...classes] = tagIdClasses.split('.');
    const [tag, id] = tagId.split('#');

    const el = document.createElement(tag || 'div');

    if (id) el.id = id;

    for (const c of classes) el.classList.add(classPrefix + c);
    for (const c of children)
      if (c)
        el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);

    return Object.assign(el, props);
  };
