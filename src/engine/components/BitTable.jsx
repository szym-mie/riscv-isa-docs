import { range } from "./core/obj";

const BitTable = (props) => {
  const columns = () => (createColumns(props.fields).toReversed());
  const indices = () => (range(0, size()).toReversed());
  const size = () => columns().reduce((a, v) => a + v.width, 0);

  return (
    <>
      <table class='bit-table bt tf w-r100'>
        <thead>
          <tr class='index'>
            <For each={indices()}>
              {(index, _) => (<td class='bd-p1'>{index}</td>)}
            </For>
          </tr>
        </thead>
        <tbody>
          <tr class='marker'>
            {/* <For each={columns()}>
              {(index, _) => (<td class='bd-p1'>{index}</td>)}
            </For> */}
          </tr>
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

const createColumns = (fields) => (fields.map((v) => createColumn(v)));

const createColumn = (field) => {
  const [rangeStart, rangeEnd] = field.range[0];
  const id = field.id;
  const width = rangeEnd - rangeStart + 1;
  const start = rangeStart;
  return { id, start, width };
}

export default BitTable;
