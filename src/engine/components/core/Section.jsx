import { Switch } from 'solid-js/web';
import { copyRef } from './env';
import IconButtonBi from './IconButtonBi';
import { useTableOfContentsContext } from '../../context/TableOfContentProvider';

const sectionIndents = {
  '0': '',
  '1': 'm-05-h',
  '2': 'm-10-h'
};

const Section = (props) => {
  const [_, tocSetEntries] = useTableOfContentsContext();
  const title = () => props.title;
  const margin = () => sectionIndents[props.tab || 0];
  tocSetEntries.addEntry({
    title: title(),
    size: props.size
  });

  return (
    <>
      <section id={props.ref}>
        <div class='row vo-05'>
          <Switch>
            <Match when={props.size === 'xl'}><h1 class='section-head'>{title()}</h1></Match>
            <Match when={props.size === 'md'}><h2 class='section-head'>{title()}</h2></Match>
            <Match when={props.size === 'sm'}><h4 class='section-head'>{title()}</h4></Match>
          </Switch>
          <IconButtonBi iconHover='link' iconAfter='link'
            css='h-font-l-2' font=''
            onClick={() => copyRef(props.ref)} />
        </div>
        <div class={margin()}>
          {props.children}
        </div>
      </section>
    </>
  );
}



export default Section;
