import doc from './engine/doc/riscv.json';

import './App.css';
import Icon from './engine/components/core/Icon';
import Document from './engine/components/Document';

import { StructParser } from './engine/struct/struct';
import metaStructInfo from './engine/struct/meta_struct.json';
import docStructInfo from './engine/struct/doc_struct.json'

const parser = new StructParser({});
const metaStruct = parser.create(metaStructInfo);
const docStruct = parser.create(docStructInfo);

console.log(docStruct);

const App = () => (
  <>
    <div class='app-cont'>
      <div class='nav d-lsha'>
        <div class='nav-box m-0 sp-10 ct-2 bg-3 d-rasterv'>
          <h1>Hello <Icon icon='home' /></h1>
        </div>
      </div>
      <div class='text sp-10'>
        <Document doc={doc} />
      </div>
      <div class='intro sp-10'></div>
    </div>
  </>
);

export default App;
