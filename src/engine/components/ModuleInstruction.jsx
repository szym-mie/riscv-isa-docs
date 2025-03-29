import Block from './core/Block';
import Code from './core/Code';
import InstructionBitTable from './InstructionBitTable';

const ModuleInstruction = (props) => {
  const obj = () => props.obj;
  const stateUpdateCode = () => obj().act.join('\n');

  return (
    <>
      <div>
        <p>Opcode: {obj().opcode}</p>
        <p>Layout: {obj().layout.name}</p>
        <Block>{obj().info}</Block>
        <div class='sp-05-v'>
          <InstructionBitTable instruction={obj()} />
        </div>
        <div class='sp-05-v'>
          <Code lang='state update'>{stateUpdateCode()}</Code>
        </div>
      </div>
    </>
  );
};

export default ModuleInstruction;
