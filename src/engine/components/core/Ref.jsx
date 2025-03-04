import { extraCSS } from './css';
import Icon from './Icon';
import Badge from './Badge';

const Ref = (props) => (
  <>
    <div class={extraCSS('row vo-05', props.css)}>
      <a class={extraCSS('', props.font)} href={props.url}>[{props.index + 1}] {props.text} <Icon icon='open_in_new' /></a>
      <Badge icon='quick_reference' key='ref' value={props.type} />
    </div>
  </>
);

export default Ref;
