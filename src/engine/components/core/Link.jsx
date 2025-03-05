import { extraCSS } from './css';
import Icon from './Icon';

const Link = (props) => (
  <>
    <a class={extraCSS('', props.font)} href={props.url}>{props.children}<Icon icon='open_in_new' /></a>
  </>
);

export default Link;
