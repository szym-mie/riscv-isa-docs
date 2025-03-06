import Block from './core/Block';
import Code from './core/Code';

const ISAInstruction = (props) => {
  const obj = () => props.obj;
  const stateUpdateCode = () => obj().act.join('\n');

  return (
    <>
      <div>
        <p>Opcode: {obj().opcode}</p>
        <p>Layout: {obj().layout.name}</p>
        <Block>{obj().info}</Block>
        <Code lang='state update'>{stateUpdateCode()}</Code>
      </div>
    </>
  );
};

export default ISAInstruction;
