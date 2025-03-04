import { test, expect, beforeEach } from 'vitest';
import { Store } from './store';

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
  testStore.register('@.authors', 'Author', (_, v) => new Author(v.full_name, v.email));

  const actualAuthor = testStore.find('Author', 'szym-mie');
  const expectedAuthor = testObject.authors['szym-mie'];

  expect(actualAuthor.name).toBe(expectedAuthor.full_name);
  expect(actualAuthor.email).toBe(expectedAuthor.email);
});

test('register complex entity', () => {
  testStore.register('@.authors', 'Author', (_, v) => new Author(v.full_name, v.email));
  testStore.register('@.posts', 'Post', (s, v) => new Post(v.title, s.find('Author', v.author)));

  const actualAuthor = testStore.find('Post', 0).author;
  const expectedAuthor = testObject.authors['szym-mie'];

  expect(actualAuthor.name).toBe(expectedAuthor.full_name);
  expect(actualAuthor.email).toBe(expectedAuthor.email);
});

test('throw on already registered', () => {
  testStore.register('@.authors', 'Author', (_, v) => new Author(v.full_name, v.email));
  expect(() => {
    testStore.register('@.posts', 'Author', (s, v) => new Post(v.title, s.find('Author', v.author)));
  }).toThrowError();
});
