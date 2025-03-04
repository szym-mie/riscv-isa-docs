import { Dynamic } from 'solid-js/web';
import TextSigil from './TextSigil';
import LinkSigil from './LinkSigil';
import ImageSigil from './ImageSigil';
import ExprSigil from './ExprSigil';
import CodeSigil from './CodeSigil';
import UListSigil from './UListSigil';
import OListSigil from './OListSigil';
import AdviseSigil from './AdviseSigil';
import RulerSigil from './RulerSigil';

const sigils = {
  'text': TextSigil,
  'link': LinkSigil,
  'image': ImageSigil,
  'expr': ExprSigil,
  'code': CodeSigil,
  'ulist': UListSigil,
  'olist': OListSigil,
  'ruler': RulerSigil,
  'advise': AdviseSigil
};

const Sigil = (props) => {
  const item = () => props.item;
  const component = () => sigils[item().elem];

  return (
    <>
      <Dynamic component={component()} item={item()} />
    </>
  );
};

export default Sigil;
