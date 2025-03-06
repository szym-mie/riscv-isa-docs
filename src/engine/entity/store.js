import { Path } from './path';

class Store {
  constructor(object) {
    this.object = object;
    this.entities = {};
  }

  resolve(path) {
    return path.resolve(this.object);
  }

  findOne(entityName, key) {
    return this.findAll(entityName)[key];
  }

  findAll(entityName) {
    return this.entities[entityName];
  }

  register(entity) {
    if (this.entities[entity.name] !== undefined) {
      throw new Error('already registered entity ' + entity.name)
    }
    const path = new Path(entity.pathText);
    const object = this.resolve(path);
    const entities = {};
    for (const [key, val] of Object.entries(object)) {
      entities[key] = entity.entityProducer(this, val);
    }
    this.entities[entity.name] = entities;
  }

  reset() {
    this.entities = {};
  }
}

class Entity {
  constructor(name, pathText, entityProducer) {
    this.name = name;
    this.pathText = pathText;
    this.entityProducer = entityProducer;
  }
}

export { Store, Entity };
