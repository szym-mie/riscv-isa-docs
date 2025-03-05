import { useStyleContext } from '../../context/StyleProvider';
import Advise from '../core/Advise';
import { extraCSS } from '../core/css';

const adviseTypes = {
  'info': { title: 'Extra', icon: 'menu_book', color: 'cx-1' },
  'warn': { title: 'Warning', icon: 'warning', color: 'cx-2' }
};

const AdviseSigil = (props) => {
  const { css, font } = useStyleContext();
  const type = () => adviseTypes[props.item.type];
  const title = () => type().title;
  const icon = () => type().icon;
  const color = () => type().color;
  const text = () => props.item.text;

  return (
    <>
      <Advise icon={icon()} title={title()} css={extraCSS(css, color())} fontTitle={font} fontText={font}>
        {text()}
      </Advise>
    </>
  );
};

export default AdviseSigil;
