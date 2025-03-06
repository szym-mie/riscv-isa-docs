import { test, expect, beforeEach } from 'vitest';
import { Store, Entity } from './store';

const testObject = {
  'authors': {
    'szym-mie': {
      full_name: 'Szym Mie',
      email: 'szym.mie@gmail.com'
    },
    'john-doe': {
      full_name: 'John Doe',
      email: 'john.doe@mail.org'
    },
    'miss-doe': {
      full_name: 'Miss Doe',
      email: 'missdoe@mail.org'
    }
  },
  'posts': [
    {
      title: 'abc',
      author: 'szym-mie'
    },
    {
      title: 'def',
      author: 'szym-mie'
    },
    {
      title: 'ghi',
      author: 'john-doe'
    },
    {
      title: 'jkl',
      author: 'anon'
    },
    {
      title: 'mno',
      author: 'john-doe'
    }
  ]
};

class Author {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class Post {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const testStore = new Store(testObject);

beforeEach(() => {
  testStore.reset();
});

test('register simple entity', () => {
  const authorEntity = new Entity('author', '@.authors',
    (_, v) => new Author(v.full_name, v.email));
  testStore.register(authorEntity);

  const actualAuthor = testStore.findOne('author', 'szym-mie');
  const expectedAuthor = testObject.authors['szym-mie'];

  expect(actualAuthor.name).toBe(expectedAuthor.full_name);
  expect(actualAuthor.email).toBe(expectedAuthor.email);
});

test('register complex entity', () => {
  const authorEntity = new Entity('author', '@.authors',
    (_, v) => new Author(v.full_name, v.email));
  const postEntity = new Entity('post', '@.posts',
    (s, v) => new Post(v.title, s.find('author', v.author)));

  testStore.register(authorEntity);
  testStore.register(postEntity);

  const actualAuthor = testStore.findOne('post', 0).author;
  const expectedAuthor = testObject.authors['szym-mie'];

  expect(actualAuthor.name).toBe(expectedAuthor.full_name);
  expect(actualAuthor.email).toBe(expectedAuthor.email);
});

test('throw on already registered', () => {
  const authorEntity = new Entity('author', '@.authors',
    (_, v) => new Author(v.full_name, v.email));
  expect(() => {
    testStore.register(authorEntity);
    testStore.register(authorEntity);
  }).toThrowError();
});
