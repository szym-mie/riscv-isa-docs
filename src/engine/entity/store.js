import { Path } from './path';

class Store {
  constructor(object) {
    this.object = object;
    this.entities = {};
  }

  resolve(path) {
    return path.resolve(this.object);
  }

  find(entityType, key) {
    return this.entities[entityType][key];
  }

  register(pathText, entityType, entityProducer) {
    if (this.entities[entityType] !== undefined) {
      throw new Error('already registered entity ' + entityType)
    }
    const path = new Path(pathText);
    const object = this.resolve(path);
    const entities = {};
    for (const [key, val] of Object.entries(object)) {
      entities[key] = entityProducer(this, val);
    }
    this.entities[entityType] = entities;
  }

  reset() {
    this.entities = {};
  }
}

export { Store };
