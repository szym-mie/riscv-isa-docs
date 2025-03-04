import { useStyleContext } from '../../context/StyleProvider';
import Link from '../core/Link';

const LinkSigil = (props) => {
  const { font } = useStyleContext();
  const url = () => props.item.url;
  const text = () => props.item.text;

  return (
    <>
      <Link url={url()} font={font}>{text()}</Link>
    </>
  );
};

export default LinkSigil;
