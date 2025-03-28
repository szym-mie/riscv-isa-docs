import { createContext, createSignal, useContext } from 'solid-js';

const TableOfContentsContext = createContext();

const TableOfContentsProvider = (props) => {
  const [entries, setEntries] = createSignal([]);
  const sections = [
    entries,
    {
      addEntry: (entry) => setEntries((prev) => [...prev, entry])
    }
  ];

  return (
    <TableOfContentsContext.Provider value={sections}>
      {props.children}
    </TableOfContentsContext.Provider>
  );
};

const useTableOfContentsContext = () => {
  const context = useContext(TableOfContentsContext);
  if (context === undefined) {
    throw new Error('cannot find table of contents context');
  }
  return context;
};

export { TableOfContentsProvider, useTableOfContentsContext };
