import { extraCSS } from './css';
import Icon from './Icon';

const Badge = (props) => {
  const icon = () => props.icon || 'icon';

  return (
    <>
      <div class={extraCSS('row', props.css)}>
        <div class='mono fs-sm cf ct-2 d-hbdark-p4 d-no-usel sp-02 vo-02'>
          <Icon icon={icon()} css='fw-600' />
          <span>{props.key}</span>
        </div>
        <div class='mono fs-sm bg-2 ct-1 d-hbdark-p4 sp-02'>
          <span>{props.value}</span>
        </div>
      </div>
    </>
  );
};

export default Badge;
