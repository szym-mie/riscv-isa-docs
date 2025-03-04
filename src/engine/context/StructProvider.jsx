import { createContext } from 'solid-js';

const StructContext = createContext();

const StructProvider = (props) => {
  return (
    <StructContext.Provider>
      {props.children}
    </StructContext.Provider>
  );
};

export default StructProvider;
