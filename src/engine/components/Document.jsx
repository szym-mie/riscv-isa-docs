import { Index } from 'solid-js';
import Section from './core/Section';
import Ref from './core/Ref';
import Block from './core/Block';
import Author from './Author';
import Meta from './Meta';
import ISA from './ISA';
import { DocumentProvider } from '../context/DocumentProvider';
import { items, kv, vals } from './core/obj';

const Document = (props) => {
  const obj = () => props.doc;

  return (
    <>
      <DocumentProvider doc={obj()}>
        <Section title={obj().title} size='xl' ref='#head'>
          <Meta of={obj()} />
          <Block>{obj().info}</Block>
          <Section title='References' size='md' ref='#refs' tab='2'>
            <Index each={obj().refs}>{createRef}</Index>
          </Section>
          <Section title='Authors' size='md' ref='#authors' tab='2'>
            <Index each={items(obj().authors)}>{createAuthor}</Index>
          </Section>
          <Section title='Instruction Sets' size='md' ref='#isas'>
            <Index each={items(obj().isas)}>{createISA}</Index>
          </Section>
        </Section>
      </DocumentProvider>
    </>
  );
};

const createRef = (it, index) => (
  <Ref index={index} text={it().text} url={it().link} type={it().type} css='sp-02-v' />
);

const createAuthor = (it, _) => {
  const [key, val] = kv(it());

  return (<Author key={key()} obj={val()} />);
};

const createISA = (it, _) => {
  const [key, val] = kv(it());

  return (
    <Section title={val().name} size='md' ref={'#isas_' + key()} tab='2'>
      <Meta of={val()} />
      <ISA key={key()} obj={val()} />
    </Section>
  );
};

export default Document;
