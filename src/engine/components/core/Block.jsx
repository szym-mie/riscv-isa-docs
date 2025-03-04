import { For } from 'solid-js';

import sigilized from '../sigil/sigils';
import Sigil from '../sigil/Sigil';
import { StyleProvider } from '../../context/StyleProvider';

const Block = (props) => {
  const text = () => props.children;
  const elems = () => sigilized(text());

  return (
    <>
      <StyleProvider css={props.css} font={props.font}>
        <For each={elems()}>
          {(item, _) => (<Sigil item={item} />)}
        </For>
      </StyleProvider>
    </>
  );
};

export default Block;
