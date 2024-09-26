export const toDisplayPartial = (element) => (data) => {
  if (element) {
    const content = [];

    for (const [key, value] of Object.entries(data)) {
      if (key === 'req') {
        content.push(`</pre><br><pre>$ ${value}`);
        continue;
      }

      if (key === 'received') {
        const ret = [];
        for (const [k, v] of Object.entries(value)) {
          if (k === 'message') {
            ret.push(`${v}`);
          } else {
            ret.push(`${k}: ${JSON.stringify(v)}`);
          }
        }
        content.push(`[lobby]: ${ret.join(' ')}`);
        continue;
      }

      content.push(`[${key}]: ${JSON.stringify(value)}`);
    }

    element.insertAdjacentHTML('beforeend', `<pre>${content}</pre>`);
    // scroll to bottom
    element.scrollTop = element.scrollHeight;
  }
};
