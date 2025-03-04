const consumeLineSigil = (elem, paramKeys, isOpen) => (source) => {
  const obj = { elem };
  for (const param of paramKeys) {
    obj[param] = '';
  }

  let ignore = false;
  let extra = false;
  let paramIndex = 0;
  let charBuffer = CharContext.empty;
  for (let consumed = 0; !source.emptied(); consumed++) {
    const char = source.next();
    if (char.is('|') && char.afterSpace) {
      // end of element - ' |'
      break;
    }
    if (char.isSpace) {
      // if first consecutive space, but not was consumed as first char
      if (!char.afterSpace && consumed > 0) {
        if (paramIndex < paramKeys.length - 1) {
          // go to next param if not consecutive space
          paramIndex++;
        } else if (!isOpen) {
          // not a vararg ignore rest
          ignore = true;
        } else {
          // mark as extra
          extra = true;
        }
      }
    }
    if (!ignore) {
      // if not ignored add to object (if there are any params)
      const paramKey = paramKeys[paramIndex] || null;
      if (paramKey !== null) {
        // if has any params
        obj[paramKey] += charBuffer.char;
        if (char.isSpace) {
          if (extra) {
            // buffer prevents extra space at the end in open elements
            charBuffer = char;
          }
        } else if (consumed > 0) {
          // first char skipped (should be space)
          obj[paramKey] += char.char;
          // clear buffer
          charBuffer = CharContext.empty;
        }
      }
    }
  }
  return obj;
};

const consumeBlockSigil = (elem, paramKeys, innerKey, isOpen) => {
  const parseInitLine = consumeLineSigil(elem, paramKeys, isOpen);
  return (source) => {
    // parse first line as if it was line sigil
    const obj = parseInitLine(source);
    obj[innerKey] = '';
    // skip everything after init line part to the next line
    skipToBreak(source);

    let charBuffer = CharContext.empty;
    for (let column = 0; !source.emptied(); column++) {
      const char = source.next();
      if (char.isBreak) {
        // buffer stores newline - prevents newline at the end of block
        charBuffer = char;
        continue;
      }
      if (char.afterBreak) {
        if (char.is('|')) {
          // next line is in block
          column = 0;
        } else {
          // end of block
          break;
        }
        continue;
      }
      if (column > 1 || !char.isSpace) {
        // allow skiping one space after block '|'
        obj[innerKey] += charBuffer.char;
        obj[innerKey] += char.char;
        // clear buffer
        charBuffer = CharContext.empty;
      }
    }
    return obj;
  };
};

const skipToBreak = (source) => {
  while (!source.emptied()) {
    const char = source.next();
    if (char.isBreak) {
      break;
    }
  }
};

const consumeText = (text) => ({ elem: 'text', text });
const consumeLink = consumeLineSigil('link', ['url', 'text'], false);
const consumeImage = consumeLineSigil('image', ['url'], false);
const consumeExpr = consumeBlockSigil('expr', ['lang'], 'text', false);
const consumeCode = consumeBlockSigil('code', ['lang'], 'text', false);
const consumeUList = consumeLineSigil('ulist', ['text'], true);
const consumeOList = consumeLineSigil('olist', ['index', 'text'], true);
const consumeAdvise = consumeBlockSigil('advise', ['type'], 'text', false);
const consumeRuler = consumeLineSigil('ruler', [], false);

const sigilConsumers = {
  '#': consumeLink,
  'i': consumeImage,
  'x': consumeExpr,
  'c': consumeCode,
  '-': consumeUList,
  '.': consumeOList,
  '!': consumeAdvise,
  '=': consumeRuler
};

const consumeSigils = (source) => {
  let text = '';
  const elems = [];
  const tryPushText = () => {
    if (text !== '') {
      elems.push(consumeText(text));
      text = '';
    }
  }

  while (!source.emptied()) {
    const char = source.next();
    if (char.is('|')) {
      // maybe a sigil
      const sigil = source.next();
      const sigilConsumer = sigilConsumers[sigil.char] || null;
      if (sigil.isSpace || sigil.isBreak || sigilConsumer === null) {
        // not a sigil, just '|'
        text += '|' + sigil.char;
      } else {
        // found sigil, push gathered text, then push consumed sigil
        tryPushText();
        elems.push(sigilConsumer(source));
      }
    } else if (char.is('\\')) {
      // skip to newline, don't emit newline to current text element
      skipToBreak(source);
    } else {
      // just add char to current text element
      text += char.char;
    }
  }
  // if anything in text buffer, write that at the end
  tryPushText();

  return elems;
};

const sigilized = (text) => consumeSigils(new TextSource(text));

class TextSource {
  constructor(text) {
    this.text = text;
    this.index = 0;
    this.charContext = new CharContext('', true, false);
  }

  next() {
    const afterBreak = this.charContext.isBreak;
    const afterSpace = this.charContext.isSpace;

    if (this.index < this.text.length) {
      const char = this.text[this.index++];
      this.charContext = new CharContext(char, afterBreak, afterSpace);
      return this.charContext;
    }
    return new CharContext('', afterBreak, afterSpace);
  }

  skip(len) {
    this.index += len;
  }

  emptied() {
    return this.index >= this.text.length;
  }

  static isSpace(char) {
    return TextSource.spaceChars.includes(char);
  }

  static isBreak(char) {
    return TextSource.breakChars.includes(char);
  }

  static spaceChars = [' ', '\t'];
  static breakChars = ['\n'];
}

class CharContext {
  constructor(char, afterBreak, afterSpace) {
    this.char = char || '';
    this.isBreak = TextSource.isBreak(char);
    this.isSpace = TextSource.isSpace(char);
    this.afterBreak = afterBreak;
    this.afterSpace = afterSpace;
  }

  is(char) {
    return this.char === char;
  }

  static empty = new CharContext('', false, false);
}

export default sigilized;
