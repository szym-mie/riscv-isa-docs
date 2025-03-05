import { extraCSS } from './css';
import Icon from './Icon';

const AccountTo = (props) => (
  <>
    <p class={extraCSS('', props.font)}>{props.site}: <a href={props.host + '/' + props.user}>{props.user} <Icon icon='account_circle' /></a>
    </p>
  </>
);

export default AccountTo;