import './Advise.css';
import { extraCSS } from './css';
import Icon from './Icon';

const Advise = (props) => {
  const title = () => props.title;
  const text = () => props.children;

  return (
    <>
      <div class={extraCSS('advise-cont d-hbdark-p4', props.css)}>
        <div class='icon center'>
          <h2 class={extraCSS('m-02-v', props.fontTitle)}><Icon icon={props.icon} /></h2>
        </div>
        <div class='title center-v'>
          <h2 class={extraCSS('fw-500 m-02-v sp-10-h', props.fontTitle)}>{title()}</h2>
        </div>
        <div class='text'>
          <p class={extraCSS('ct-2 m-05-u sp-10-h', props.fontText)}>{text()}</p>
        </div>
      </div>
    </>
  )
};

export default Advise;
