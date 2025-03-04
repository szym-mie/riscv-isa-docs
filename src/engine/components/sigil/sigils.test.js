import { test, expect } from 'vitest';
import sigilized from './sigils';

const text = (text) => ({ elem: 'text', text });
const link = (url, text) => ({ elem: 'link', url, text });
const image = (url) => ({ elem: 'image', url });
const expr = (lang, text) => ({ elem: 'expr', lang, text });
// const code = (lang, text) => ({ elem: 'code', lang, text }); // eq to 'expr'
const ulist = (text) => ({ elem: 'ulist', text });
const olist = (index, text) => ({ elem: 'olist', index, text });
const advise = (type, text) => ({ elem: 'advise', type, text });
const ruler = () => ({ elem: 'ruler' });

const expectSigils = (text, expected) => () => {
  expect(sigilized(text)).toStrictEqual(expected);
};

test('just text, no \'|\'',
  expectSigils('abc\n  def', [text('abc\n  def')])
);

test('join line',
  expectSigils('abc\\def\nghi', [text('abcghi')])
);

test('just text, with plain \'|\'',
  expectSigils('abc\n | def', [text('abc\n | def')])
);

test('just text, ignore unknown sigil',
  expectSigils('abc\n |m ok |', [text('abc\n |m ok |')])
);

test('string ends with \'|\'',
  expectSigils('abc|', [text('abc|')])
);

test('no space before end \'|\'',
  expectSigils('|# site.com Site|', [link('site.com', 'Site|')])
);

test('just link',
  expectSigils('|# site.com Site |', [link('site.com', 'Site')])
);

test('text & link',
  expectSigils('abc |# wikipedia.org Wikipedia |', [
    text('abc '),
    link('wikipedia.org', 'Wikipedia')
  ])
);

test('text & link & text',
  expectSigils('abc |# wikipedia.org Wikipedia | def', [
    text('abc '),
    link('wikipedia.org', 'Wikipedia'),
    text(' def')
  ])
);

test('just image',
  expectSigils('|i tabliss.com/some_image.png |', [
    image('tabliss.com/some_image.png')
  ])
);

test('just expr',
  expectSigils('|x js |\n| !![]\n', [
    expr('js', '!![]')
  ])
);

test('just expr, no end newline',
  expectSigils('|x js |\n| !![]', [
    expr('js', '!![]')
  ])
);

test('text & unordered list',
  expectSigils('abc:\n|- i1 |\n|- j2 |\n|- k3 |\n', [
    text('abc:\n'),
    ulist('i1'),
    text('\n'),
    ulist('j2'),
    text('\n'),
    ulist('k3'),
    text('\n'),
  ])
);

test('text & ordered list 1 2 3',
  expectSigils('abc:\n|. 1 i1 |\n|. 2 j2 |\n|. 3 k3 |\n', [
    text('abc:\n'),
    olist('1', 'i1'),
    text('\n'),
    olist('2', 'j2'),
    text('\n'),
    olist('3', 'k3'),
    text('\n'),
  ])
);

test('text & ordered list a b c',
  expectSigils('abc:\n|. a i1 |\n|. b j2 |\n|. c k3 |\n', [
    text('abc:\n'),
    olist('a', 'i1'),
    text('\n'),
    olist('b', 'j2'),
    text('\n'),
    olist('c', 'k3'),
    text('\n'),
  ])
);

test('non-open element (ignores extra params)',
  expectSigils('|# ok.org OK what |', [
    link('ok.org', 'OK')
  ])
);

test('open element (last param takes the rest)',
  expectSigils('|- ok abc  def   ghi |', [
    ulist('ok abc  def   ghi')
  ])
);

test('just advise',
  expectSigils('|! warn |\n| test should pass\n| run them\n ', [
    advise('warn', 'test should pass\nrun them')
  ])
);

test('just advise, with \'|\'',
  expectSigils('|! warn |\n| test should pass |\n| run them\n ', [
    advise('warn', 'test should pass |\nrun them')
  ])
)

test('just ruler',
  expectSigils('|= |', [
    ruler()
  ])
);
