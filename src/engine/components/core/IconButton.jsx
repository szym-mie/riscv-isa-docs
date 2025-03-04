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
      <pre class={extraCSS('', props.font)}><Icon icon={props.icon} /></pre>
    </div>
  );
}

export default IconButton;
