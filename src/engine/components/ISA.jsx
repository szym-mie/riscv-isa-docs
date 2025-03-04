import { Index } from 'solid-js';
import Section from './core/Section';
import Meta from './Meta';
import ISALayout from './ISALayout';
import ISAInstruction from './ISAInstruction';

const ISA = (props) => {
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
      <ISALayout obj={it()} />
    </Section>
  );
};

const createInstruction = (it, _) => {
  return (
    <Section title={it().name} size='sm' tab='2'>
      <Meta of={it()} />
      <ISAInstruction obj={it()} />
    </Section>
  );
};

export default ISA;
