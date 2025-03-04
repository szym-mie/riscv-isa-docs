import { For } from 'solid-js';
import { useStyleContext } from '../../context/StyleProvider';
import { extraCSS } from '../core/css';

const TextSigil = (props) => {
  const { font } = useStyleContext();
  const lines = () => props.item.text.split('\n');

  return (
    <>
      <p class={extraCSS('', font)}>
        <For each={lines()}>{(item, _) => (<>{item}<br /></>)}</For>
      </p>
    </>
  );
};

export default TextSigil;
