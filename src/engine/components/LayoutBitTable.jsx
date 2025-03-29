import { range } from './core/obj';

import './BitTable.css';

const LayoutBitTable = (props) => {
  const columns = () => createColumns(props.layout);
  const indices = () => createIndices(size());
  const size = () => getSize(columns())

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

const getSize = (columns) => columns.reduce((a, v) => a + v.width, 0);

export default LayoutBitTable;
