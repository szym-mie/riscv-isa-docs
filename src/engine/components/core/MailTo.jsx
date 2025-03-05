import { extraCSS } from './css';
import Icon from './Icon';

const MailTo = (props) => (
  <>
    <a class={extraCSS('', props.font)} href={'mailto:' + props.email}>{props.email} <Icon icon='mail' /></a>
  </>
);

export default MailTo;