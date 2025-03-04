import './Code.css';
import Icon from './Icon';
import IconButtonBi from './IconButtonBi';
import { copy } from './env';

const Code = (props) => {
  const text = () => props.children;

  return (
    <div class='code-cont vb-p4 bg-2'>
      <div class='code sp-10-h sp-02-v'>
        <pre class='mono hint fs-sm m-02-v'><Icon icon='code_blocks' css='fw-600' /> {props.lang}</pre>
        <pre class='mono m-05-v'>{text()}</pre>
      </div>
      <IconButtonBi iconHover='content_copy' iconAfter='check'
        css='copy h-font-l-2' font='mono hint m-0'
        onClick={() => copy(text())} />
    </div>
  )
};

export default Code;
