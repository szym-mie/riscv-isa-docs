import { createContext, useContext } from 'solid-js';

const StyleContext = createContext();

const StyleProvider = (props) => {
  const value = () => ({
    css: props.css,
    font: props.font
  });

  return (
    <StyleContext.Provider value={value()}>
      {props.children}
    </StyleContext.Provider>
  );
};

const useStyleContext = () => {
  const context = useContext(StyleContext);
  if (context === undefined) {
    throw new Error('cannot find style context');
  }
  return context;
};

export { StyleProvider, useStyleContext };
