import {
  ObjectNode,
  StringNode,
  NumberNode,
  BooleanNode,
  MapNode,
  ListNode,
  ReferMapNode,
  ReferListNode,
  AnyNode
} from './nodes';

export class StructParser {
  /**
   * 
   * @param {object} options 
   * @param {boolean} [options.noImports]
   * @param {boolean} [options.noExtraLoops]
   */
  constructor(options) {
    this.noImports = options.noImports || false;
    this.noExtraLoops = options.noExtraLoops || true;
    this.structs = {};
  }

  create(structInfo) {
    const id = this.getId(structInfo);
    const root = this.buildAll(structInfo);
    const struct = new Struct(id, root);
    console.log(struct);
    // this.linkAll(struct);

    this.structs[id] = struct;
    return struct;
  }

  importStruct(structId) {
    const struct = this.structs[structId];
    if (struct === undefined)
      throw new StructImportError('no such struct', structId);
    // TODO what about refs
    return struct.root.clone();
  }

  getId(structInfo) {
    const id = structInfo['@struct'];
    if (id === undefined)
      throw new StructParseError('missing @struct', structInfo);
    return id;
  }

  /**
   * 
   * @param {object} structInfo 
   */
  buildAll(structInfo) {
    return this.buildNode(structInfo, ['@']);
  }

  static pathTo(nodePath, key) {
    return [...nodePath, key];
  }

  buildTo(nodeInfo, nodePath, key) {
    const path = StructParser.pathTo(nodePath, key);
    return this.buildNode(nodeInfo[key], path);
  }

  /**
   * 
   * @private
   * @param {object} nodeInfo 
   */
  buildNode(nodeInfo, nodePath) {
    console.log(nodeInfo);
    if (nodeInfo === undefined)
      throw new StructParseError('null node', nodeInfo, nodePath);
    const typeOf = nodeInfo['@of'];
    if (typeOf === undefined)
      throw new StructParseError('missing @of', nodeInfo, nodePath);

    const extra = nodeInfo['@extra'] || false;

    switch (typeOf) {
      case 'obj':
        const fieldsEntries = this.getKeys(nodeInfo)
          .map((k) => [k, this.buildTo(nodeInfo, nodePath, k)]);
        const fields = Object.fromEntries(fieldsEntries);
        return new ObjectNode(nodePath, extra, fields);
      case 'str':
        return new StringNode(nodePath, extra, nodeInfo['@only'] || null);
      case 'num':
        return new NumberNode(nodePath, extra, nodeInfo['@range'] || null);
      case 'bool':
        return new BooleanNode(nodePath, extra);
      case '{}':
        return new MapNode(nodePath, extra, this.buildTo(nodeInfo, nodePath, '@item'));
      case '[]':
        return new ListNode(nodePath, extra, this.buildTo(nodeInfo, nodePath, '@item'));
      case '&{}':
        return new ReferMapNode(nodePath, extra, nodeInfo['@ref'].split('.'));
      case '&[]':
        return new ReferListNode(nodePath, extra, nodeInfo['@ref'].split('.'));
      case 'any':
        return new AnyNode(nodePath, extra);
      default:
        return this.importStruct(typeOf);
    }
  }

  linkAll(struct) {
    return this.linkNode(struct, struct.root, ['@']);
  }

  /**
   * 
   * @private
   * @param {ItemNode} node 
   */
  linkNode(struct, node) {
    if (node === undefined)
      throw new StructParseError('null node', node, node.path);
    switch (node.typeOf) {
      case '&{}':
      case '&[]':
        return node.link(struct);
      default:
        return node.inner.flatMap(v => this.linkNode(v));
    }
  }

  getKeys(nodeInfo) {
    return Object.keys(nodeInfo)
      .filter((v) => !v.match(/^@.+$/))
  }
}

class StructImportError extends Error {
  constructor(about, structId) {
    super(about + ': ' + structId);
  }
}

class StructParseError extends Error {
  constructor(about, nodeInfo, nodePath) {
    super(about + ': ' + JSON.stringify(nodeInfo) + ' at ' + nodePath.join('.'));
  }
}

export class Struct {
  /**
   * 
   * @param {string} id 
   * @param {ItemNode} root 
   */
  constructor(id, root) {
    this.id = id;
    this.root = root;
    this.refs = null;
  }

  resolvePath(pathText) {
    let node = this.root;
    for (const component of new Path(pathText).getEscaped()) {
      node = node.getNextNode(component);
    }
    return node;
  }

  isFinal() {
    return this.refs !== null && this.refs.all();
  }
}

export class Path {
  constructor(pathText) {
    this.components = pathText.split('.');
    this.modifiers = Path.parseModifiers(this.components[0]);
    this.isExternal = this.modifiers.include('ext');
    this.isPure = this.modifiers.length === 0;
  }

  getEscaped() {
    return this.components.map(c => c.replaceAll(/@\([-,a-z0-9]*\)/, '@'));
  }

  static parseModifiers(rootComponent) {
    try {
      const [_, modifiersText] = rootComponent.match(/@\(([-,a-z]+)\)/);
      return modifiersText.split(',');
    } catch {
      throw new PathParseError('cannot parse modifiers', rootComponent);
    }
  }
}

class PathParseError extends Error {
  constructor(about, component) {
    super(about + ' in ' + component);
  }
}
