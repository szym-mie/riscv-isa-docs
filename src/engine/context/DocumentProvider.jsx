import { createContext, useContext } from 'solid-js';
import { Store } from '../entity/store';

const DocumentContext = createContext();

const DocumentProvider = (props) => {
  const store = new Store(props.obj);

  return (
    <DocumentContext.Provider value={store}>
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
