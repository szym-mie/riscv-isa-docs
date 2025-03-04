import { createContext, useContext } from 'solid-js';

const DocumentContext = createContext();

const DocumentProvider = (props) => {
  const value = () => props.doc;

  return (
    <DocumentContext.Provider value={value()}>
      {props.children}
    </DocumentContext.Provider>
  );
};

const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('cannot find document context');
  }
  return context;
};

export { DocumentProvider, useDocumentContext };
