const host = () => new URL(window.location.host);
const href = (url) => new URL(url || '', window.location.href);
const copy = (text) => navigator.clipboard.writeText(text);
const copyRef = (ref) => copy(href(ref));

export {
  host,
  href,
  copy,
  copyRef
};
