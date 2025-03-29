import { range } from './core/obj';

import './BitTable.css';

const InstructionBitTable = (props) => {
  const columns = () => createColumns(props.instruction.layout);
  const indices = () => createIndices(size());
  const bits = () => createBits(props.instruction, size());
  const size = () => getSize(columns());

  return (
    <>
      <table class='bit-table bt tf w-r100'>
        <thead>
          <tr class='index'>
            <For each={columns()}>
              {({ id, start, width }, _) => (
                <td colspan={width}>
                  <div class='index-pair sp-02-h'>
                    <span>{start + width - 1}</span>
                    <span>{start}</span>
                  </div>
                </td>
              )}
            </For>
          </tr>
          <tr class='marker'>
            <For each={indices()}>
              {(_index, _) => (<td class="bd-p1-l bd-p1-r s-02-v"></td>)}
            </For>
          </tr>
        </thead>
        <tbody>
          <tr class='range'>
            <For each={columns()}>
              {({ id, start, width }, _) => (<td class='bd-p1' colspan={width}>{id}</td>)}
            </For>
          </tr>
          <tr class='bits'>
            <For each={bits()}>
              {(bit, _) => (<td class='bd-p1'>{bit}</td>)}
            </For>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const createColumns = (layout) => layout.fields
  .map((v) => createColumn(v))
  .toReversed();

const createColumn = (field) => {
  const [rangeStart, rangeEnd] = field.range[0];
  const id = field.id;
  const width = rangeEnd - rangeStart + 1;
  const start = rangeStart;
  return { id, start, width };
};

const createIndices = (size) => range(0, size).toReversed();

const getBits = (bitsText) => bitsText.match(/[01]+$/)[0].split('');

const createBits = (instruction, size) => {
  const instructionBits = range(0, size).map(() => '-');
  for (const field of instruction.layout.fields) {
    const param = instruction[field.type];
    if (param === undefined) {
      continue;
    }

    let fieldBits = ['?'];
    const maps = field.maps;
    switch (field.type) {
      case 'opcode':
        fieldBits = getBits(param);
        break;
      case 'func':
        fieldBits = getBits(param[maps[0]]);
        break;
      case 'reg':
        fieldBits = getBits(param[maps[0]][maps[1]]);
        break;
      case 'imm':
        const unmappedBits = getBits(param);
        fieldBits = getBits(param);
        let dst = 0;
        for (const swap of maps) {
          const [swapStart, swapEnd] = swap;
          for (let src = swapStart; src <= swapEnd; src++) {
            fieldBits[dst++] = unmappedBits[src];
          }
        }
        break;
    }

    let src = 0;
    for (const part of field.range) {
      const [partStart, partEnd] = part;
      for (let dst = partEnd; dst >= partStart; dst--) {
        instructionBits[dst] = fieldBits[src++];
      }
      console.log(field.id, field.range, fieldBits);
    }
  }

  return instructionBits.toReversed();
};

const getSize = (columns) => columns.reduce((a, v) => a + v.width, 0);

export default InstructionBitTable;
