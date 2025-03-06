import { Index } from 'solid-js';
import { items, kv } from './core/obj';
import Badge from './core/Badge';

const formatString = () => (get) => (e) => get(e);
const formatArray = (sep) => (get) => (e) => e.map((v) => get(v)).join(sep);

const badgeIcons = {
  authors: 'person',
  ref: 'jump_to_element',
  since: 'history',
  wip: 'service_toolbox',
  not_sure: 'question_mark',
  fix_me: 'healing'
};

const badgeGetters = {
  authors: (e) => e.full_name,
  ref: (e) => e.name,
  since: (e) => e,
  wip: (e) => e,
  not_sure: (e) => e,
  fix_me: (e) => e
};

const badgeFormaters = {
  authors: formatArray(', '),
  ref: formatString(),
  since: formatString(),
  wip: formatString(),
  not_sure: formatString(),
  fix_me: formatString()
};

const Meta = (props) => {
  const meta = () => props.of._meta || {};

  return (
    <>
      <div class='row sp-02-v vo-05'>
        <Index each={items(meta())}>{createBadge}</Index>
      </div>
    </>
  )
}

const createBadge = (it, _) => {
  const [key, val] = kv(it());
  const icon = () => badgeIcons[key()] || 'category';
  const getter = () => badgeGetters[key()] || ((e) => e);
  const formatter = () => badgeFormaters[key()] || formatString();

  return (<Badge icon={icon()} key={key()} value={formatter()(getter())(val())} />);
};

export default Meta;
