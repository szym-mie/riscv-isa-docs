class ItemNode {
  constructor(path, typeOf, extra) {
    this.path = path;
    this.typeOf = typeOf;
    this.extra = extra;
    this.inner = [];
  }

  /**
   * @abstract
   * @param {string} _component 
   */
  getNextNode(_component) {
    throw new Error('abstract method not implemented');
  }

  /**
   * @abstract
   */
  clone() {
    throw new Error('abstract method not implemented');
  }
}

class CollectionNode extends ItemNode {
  constructor(path, typeOf, extra, item) {
    super(path, typeOf, extra);
    this.item = item;
    this.inner = [this.item];
  }

  getNextNode(component) {
    return component === '@item' ? this.item : null;
  }
}

export class ObjectNode extends ItemNode {
  constructor(path, extra, fields) {
    super(path, 'obj', extra);
    this.fields = fields;
    this.inner = Object.values(fields);
  }

  getNextNode(component) {
    return this.fields[component] || null;
  }

  clone() {
    const fields = mapValues(this.fields, v => v.clone());
    return new ObjectNode(this.path, this.extra, fields);
  }
}

export class StringNode extends ItemNode {
  constructor(path, extra, only) {
    super(path, 'str', extra);
    this.only = only;
  }

  getNextNode(_) {
    return null;
  }

  clone() {
    return new StringNode(this.path, this.extra, this.only);
  }
}

export class NumberNode extends ItemNode {
  constructor(path, extra, range) {
    super(path, 'num', extra);
    this.range = range;
  }

  getNextNode(_) {
    return null;
  }

  clone() {
    return new NumberNode(this.path, this.extra, this.range);
  }
}

export class BooleanNode extends ItemNode {
  constructor(path, extra) {
    super(path, 'bool', extra);
  }

  getNextNode(_) {
    return null;
  }

  clone() {
    return new BooleanNode(this.path, this.extra);
  }
}

export class MapNode extends CollectionNode {
  constructor(path, extra, item) {
    super(path, '{}', extra, item);
  }

  getNextNode(_) {
    return null;
  }

  clone() {
    return new MapNode(this.path, this.extra, this.item.clone());
  }
}

export class ListNode extends CollectionNode {
  constructor(path, extra, item) {
    super(path, '[]', extra, item);
  }

  getNextNode(_) {
    return null;
  }

  clone() {
    return new ListNode(this.path, this.extra, this.item.clone());
  }
}

class ReferNode extends ItemNode {
  constructor(path, typeOf, extra, refPath) {
    super(path, typeOf, extra);
    this.refPath = refPath;
    this.ref = null;
  }

  link(struct) {

  }
}

export class ReferMapNode extends ReferNode {
  constructor(path, extra, refPath) {
    super(path, '&{}', extra, refPath);
  }

  getNextNode(_) {
    return null;
  }

  clone() {
    return new ReferMapNode(this.path, this.extra, this.refPath);
  }
}

export class ReferListNode extends ReferNode {
  constructor(path, extra, refPath) {
    super(path, '&[]', extra, refPath);
  }

  getNextNode(_) {
    return null;
  }

  clone() {
    return new ReferListNode(this.path, this.extra, this.refPath);
  }
}

export class AnyNode extends ItemNode {
  constructor(path, extra) {
    super(path, 'any', extra);
  }

  getNextNode(_) {
    return null;
  }

  clone() {
    return new AnyNode(this.path, this.extra);
  }
}

const mapValues = (o, mapper) => Object.fromEntries(
  Object.entries(o).map(([k, v]) => [k, mapper(v)])
);
