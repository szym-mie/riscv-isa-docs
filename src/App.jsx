import doc from './engine/doc/riscv.yaml?raw';

import './App.css';
import Icon from './engine/components/core/Icon';
import Document from './engine/components/Document';
import YAML from 'yaml';
import { TableOfContentsProvider } from './engine/context/TableOfContentProvider';
import TableOfContents from './engine/components/core/TableOfContents';

const App = () => (
  <>
    <TableOfContentsProvider>
      <div class='app-cont'>
        <div class='nav d-lsha'>
          <div class='nav-box m-0 sp-10 ct-2 bg-3 d-rasterv'>
            <h1>Hello <Icon icon='home' /></h1>
            <TableOfContents />
          </div>
        </div>
        <div class='text sp-10'>
          <Document doc={YAML.parse(doc)} />
        </div>
        <div class='intro sp-10'></div>
      </div>
    </TableOfContentsProvider>
  </>
);

export default App;
