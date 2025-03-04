import { useStyleContext } from '../../context/StyleProvider';
import Advise from '../core/Advise';

const adviseTypes = {
  'info': { title: 'Extra', icon: 'menu_book' },
  'warn': { title: 'Warning', icon: 'warning' }
};

const AdviseSigil = (props) => {
  const { css, font } = useStyleContext();
  const type = () => adviseTypes[props.item.type];
  const title = () => type().title;
  const icon = () => type().icon;
  const text = () => props.item.text;

  return (
    <>
      <Advise icon={icon()} title={title()} css={css} fontTitle={font} fontText={font}>
        {text()}
      </Advise>
    </>
  );
};

export default AdviseSigil;
