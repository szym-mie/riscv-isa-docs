import { createContext, createSignal, useContext } from 'solid-js';

const TOCContext = createContext();

// ad-hoc implementation
const TOCProvider = (props) => {
  const [TOC, setTOC] = createSignal();

  return (
    <TOCContext.Provider value={[TOC, setTOC]}>
      {props.children}
    </TOCContext.Provider>
  );
};

const useTOCContext = () => {
  const context = useContext(TOCContext);
  if (context === undefined) {
    throw new Error('cannot find TOC context');
  }
  return context;
};

export { TOCProvider, useTOCContext };
