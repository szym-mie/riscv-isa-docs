import { extraCSS } from './core/css';
import Icon from './core/Icon';
import Badge from './core/Badge';

const Reference = (props) => {
  const obj = () => props.obj;

  return (
    <>
      <div class={extraCSS('row vo-05', props.css)}>
        <a class={extraCSS('', obj().font)} href={obj().link}>[{props.index + 1}] {obj().name} <Icon icon='open_in_new' /></a>
        <Badge icon='quick_reference' key='ref' value={obj().type} />
      </div>
    </>
  );
};

export default Reference;
