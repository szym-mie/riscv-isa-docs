import { Switch } from 'solid-js/web';
import { copyRef } from './env';
import { useTableOfContentsContext } from '../../context/TableOfContentProvider';

import IconButtonBi from './IconButtonBi';
import './Section.css';

const sectionIndents = {
  '0': '',
  '1': 'm-05-h',
  '2': 'm-10-h'
};

const Section = (props) => {
  const [_, tocSetEntries] = useTableOfContentsContext();
  const title = () => props.title;
  const margin = () => sectionIndents[props.tab || 0];

  const tocAddEntry = (elem) => {
    tocSetEntries.addEntry({
      title: title(),
      elem: elem,
      size: props.size
    });
  };


  return (
    <>
      <section ref={tocAddEntry} id={props.ref}>
        <div class='row vo-05 center-v'>
          <Switch>
            <Match when={props.size === 'xl'}><h1 class='section-head'>{title()}</h1></Match>
            <Match when={props.size === 'md'}><h2 class='section-head'>{title()}</h2></Match>
            <Match when={props.size === 'sm'}><h4 class='section-head'>{title()}</h4></Match>
          </Switch>
          <div class='icon-xl center'>
            <IconButtonBi iconHover='link' iconAfter='link'
              css='h-font-l-2' font=''
              onClick={() => copyRef(props.ref)} />
          </div>
        </div>
        <div class={margin()}>
          {props.children}
        </div>
      </section>
    </>
  );
}



export default Section;
