const keys = (obj) => Object.keys(obj);
const vals = (obj) => Object.values(obj);
const items = (obj) => Object.entries(obj);
const kv = (it) => [() => it[0], () => it[1]];
const range = (s, e) => new Array(e - s).fill(0).map((_, i) => i + s);

export {
  keys,
  vals,
  items,
  kv,
  range
};