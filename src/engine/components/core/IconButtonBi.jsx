import { createSignal } from 'solid-js';
import IconButton from './IconButton';

const IconButtonBi = (props) => {
  const [pressedNow, setPressedNow] = createSignal(false);
  const [pressedOnce, setPressedOnce] = createSignal(false);
  const [hoverNow, setHoverNow] = createSignal(false);

  const handleClick = () => {
    setPressedOnce(true);
    setPressedNow(true);
    props.onClick();
  };
  const handleHover = () => {
    setHoverNow(true);
  };
  const handleOut = () => {
    setHoverNow(false);
    setPressedNow(false);
  };

  const displayIconHover = () => (!pressedOnce() || hoverNow()) && !pressedNow();
  const icon = () => displayIconHover() ? props.iconHover : props.iconAfter;

  return (
    <IconButton icon={icon()} css={props.css} font={props.font}
      onClick={handleClick}
      onHover={handleHover}
      onOut={handleOut} />
  );
}

export default IconButtonBi;