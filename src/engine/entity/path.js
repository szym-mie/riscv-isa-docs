class Path {
  constructor(pathText) {
    this.components = pathText.split('.');
    this.modifiers = Path.parseModifiers(this.components[0]);
    this.isExternal = this.modifiers.includes('ext');
    this.isPure = this.modifiers.length === 0;
  }

  resolve(obj) {
    let node = { '@': obj };
    for (const component of this.getEscaped()) {
      node = node[component];
    }
    return node;
  }

  getEscaped() {
    return this.components.map(c => c.replaceAll(/@\([-,a-z0-9]*\)/g, '@'));
  }

  static parseModifiers(rootComponent) {
    try {
      const [_, modifiersText] = rootComponent.match(/^@(?:\(([-,a-z]*)\))?$/);
      return modifiersText !== undefined ? modifiersText.split(',') : [];
    } catch {
      throw new Error('cannot parse modifiers in ' + rootComponent);
    }
  }
}

export { Path };
