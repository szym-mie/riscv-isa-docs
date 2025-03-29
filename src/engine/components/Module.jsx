import { Index } from 'solid-js';
import Section from './core/Section';
import Meta from './Meta';
import ModuleLayout from './ModuleLayout';
import ModuleInstruction from './ModuleInstruction';

const Module = (props) => {
  const key = () => props.key;
  const obj = () => props.obj;
  const layouts = () => obj().layouts;
  const instructions = () => obj().instructions;

  return (
    <>
      <Section title='Layouts' size='md' tab='2'>
        <Index each={Object.values(layouts())}>
          {createLayout}
        </Index>
      </Section>
      <Section title='Instructions' size='md' tab='2'>
        <Index each={Object.values(instructions())}>
          {createInstruction}
        </Index>
      </Section>
    </>
  )
};

const createLayout = (it, _) => {
  return (
    <Section title={it().name} size='sm' tab='2'>
      <Meta of={it()} />
      <ModuleLayout obj={it()} />
    </Section>
  );
};

const createInstruction = (it, _) => {
  return (
    <Section title={it().name} size='sm' tab='2'>
      <Meta of={it()} />
      <ModuleInstruction obj={it()} />
    </Section>
  );
};

export default Module;
