const extraCSS = (coreClasses, userClasses) => {
  return (coreClasses + ' ' + (userClasses || ''));
}

export { extraCSS };