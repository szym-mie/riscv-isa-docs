import { extraCSS } from './css';
import Icon from './Icon';

const IconButton = (props) => {
  const handleNull = () => { console.log('handle null') };
  const handleClick = () => props.onClick || handleNull;
  const handleHover = () => props.onHover || handleNull;
  const handleOut = () => props.onOut || handleNull;

  return (
    <div class={extraCSS('center i-click', props.css)}
      onMouseDown={handleClick()}
      onMouseEnter={handleHover()}
      onMouseLeave={handleOut()}>
      <Icon css={extraCSS('', props.font)} icon={props.icon} />
    </div>
  );
}

export default IconButton;
