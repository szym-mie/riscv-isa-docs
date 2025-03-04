import { Index } from 'solid-js';
import Badge from './core/Badge';

const badgeIcons = {
  authors: 'person',
  ref: 'jump_to_element',
  since: 'history',
  wip: 'service_toolbox',
  not_sure: 'question_mark',
  fix_me: 'healing'
};

const formatString = () => (e) => e;
const formatArray = (sep) => (e) => e.reduce((c, v) => c + sep + v, '');
const formatPercent = () => (e) => e + '%';
const formatBoolean = () => (e) => e ? 'true' : 'false';

const badgeFormaters = {
  authors: formatArray(' '),
  ref: formatString(),
  since: formatString(),
  wip: formatPercent(),
  not_sure: formatString(),
  fix_me: formatString()
}

const Meta = (props) => {
  const meta = () => props.of['-meta'] || {};

  return (
    <>
      <div class='row sp-02-v vo-05'>
        <Index each={Object.entries(meta())}>{createBadge}</Index>
      </div>
    </>
  )
}

const createBadge = (item, _) => {
  const [key, value] = item();
  const icon = badgeIcons[key] || 'category';
  const formatter = badgeFormaters[key] || formatString();

  return (<Badge icon={icon} key={key} value={formatter(value)} />);
};

export default Meta;
