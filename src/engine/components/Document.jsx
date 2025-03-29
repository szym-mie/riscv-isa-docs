import { Index } from 'solid-js';
import Section from './core/Section';
import Block from './core/Block';
import Reference from './Reference';
import Author from './Author';
import Meta from './Meta';
import Module from './Module';
import { items, kv } from './core/obj';

const Document = (props) => {
  const obj = () => props.doc;

  return (
    <>
      <Section title={obj().title} size='xl' ref='#head'>
        <Meta of={obj()} />
        <Block>{obj().info}</Block>
        <Section title='References' size='md' ref='#refs' tab='2'>
          <Index each={items(obj().refs)}>{createRef}</Index>
        </Section>
        <Section title='Authors' size='md' ref='#authors' tab='2'>
          <Index each={items(obj().authors)}>{createAuthor}</Index>
        </Section>
        <Section title='Instruction Sets' size='md' ref='#isas'>
          <Index each={items(obj().modules)}>{createModule}</Index>
        </Section>
      </Section>
    </>
  );
};

const createRef = (it, index) => {
  const [key, val] = kv(it());
  return (<Reference index={index} obj={val()} css='sp-02-v' />);
};

const createAuthor = (it, _) => {
  const [key, val] = kv(it());
  return (<Author key={key()} obj={val()} />);
};

const createModule = (it, _) => {
  const [key, val] = kv(it());
  return (
    <Section title={val().name} size='md' ref={'#isas_' + key()} tab='2'>
      <Meta of={val()} />
      <Module key={key()} obj={val()} />
    </Section>
  );
};

export default Document;
