import { useStyleContext } from "../../context/StyleProvider";

const OListSigil = (props) => {
  const { font } = useStyleContext();
  const items = () => props.item.items;

  return (
    <ol class={extraCSS('', font)}>
      <For each={items()}>
        {(item, _) => (<li value={item.index}>{item.text}</li>)}
      </For>
    </ol>
  );
};

export default OListSigil;