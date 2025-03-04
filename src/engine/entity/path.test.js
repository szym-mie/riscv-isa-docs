import { test, expect } from 'vitest';
import { Path } from './path';

const testObject = {
  'a': [1, 2, 3],
  'b': [4, 5, 6],
  'c': { 'd': 7, 'e': 8, 'f': 9 }
};

test('basic path components', () => {
  expect(new Path('@.abc.def.ghi-123').components)
    .toStrictEqual(['@', 'abc', 'def', 'ghi-123']);
});

test('basic path modifiers', () => {
  expect(new Path('@(ext,-)').modifiers)
    .toStrictEqual(['ext', '-']);
});

test('throw on bad modifiers', () => {
  expect(() => (new Path('@(ext1)'))).toThrowError();
});

test('escaped path', () => {
  expect(new Path('@(ext).abc.def.ghi-123').getEscaped())
    .toStrictEqual(['@', 'abc', 'def', 'ghi-123']);
});

test('resolve path to number', () => {
  expect(new Path('@.a.1').resolve(testObject)).toBe(2);
});

test('resolve path to object', () => {
  expect(new Path('@.a').resolve(testObject)).toBe(testObject.a);
});

test('resolve path of nested object', () => {
  expect(new Path('@.c.d').resolve(testObject)).toBe(testObject.c.d);
});

test('throw on resolve path', () => {
  expect(() => (new Path('@e').resolve(testObject))).toThrowError();
});