const awaitFontLoaded = (font) => (
  new Promise((resolve, _reject) => {
    document.fonts.addEventListener('loadingdone', (ev) => {
      if (hasFont(ev.fontfaces, font)) {
        resolve(true);
      }
    });
  })
);

const hasFont = (fontfaces, font) => (
  fontfaces.find((v) => v.family === font) !== undefined
);

export {
  awaitFontLoaded,
  hasFont
};