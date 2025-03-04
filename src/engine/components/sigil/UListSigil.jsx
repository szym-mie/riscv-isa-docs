import { useStyleContext } from "../../context/StyleProvider";
import { extraCSS } from "../core/css";

const UListSigil = (props) => {
  const { font } = useStyleContext();
  const items = () => props.item.items;

  return (
    <ul class={extraCSS('', font)}>
      <For each={items()}>
        {(item, _) => (<li>{item.text}</li>)}
      </For>
    </ul>
  );
};

export default UListSigil;
