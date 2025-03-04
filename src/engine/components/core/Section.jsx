import { Switch } from 'solid-js/web';
import { copyRef } from './env';
import IconButtonBi from './IconButtonBi';

const sectionIndents = {
  '0': '',
  '1': 'm-05-h',
  '2': 'm-10-h'
};

const Section = (props) => {
  const title = () => props.title;
  const margin = () => sectionIndents[props.tab || 0];

  return (
    <>
      <section id={props.ref}>
        <div class='row vo-05'>
          <Switch>
            <Match when={props.size === 'xl'}><h1>{title()}</h1></Match>
            <Match when={props.size === 'md'}><h2>{title()}</h2></Match>
            <Match when={props.size === 'sm'}><h4>{title()}</h4></Match>
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
