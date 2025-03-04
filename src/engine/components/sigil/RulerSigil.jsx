import { useStyleContext } from "../../context/StyleProvider";
import { extraCSS } from "../core/css";

const RulerSigil = (props) => {
  const { font } = useStyleContext();

  return (
    <>
      <hr class={extraCSS('', font)} />
    </>
  );
};

export default RulerSigil;
