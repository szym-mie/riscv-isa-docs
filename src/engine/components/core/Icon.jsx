import { extraCSS } from './css';

const Icon = (props) => {
  return (
    <span class={extraCSS('sym-material d-no-usel', props.css)}>{props.icon}</span>
  )
};

export default Icon;
