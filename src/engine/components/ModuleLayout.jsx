import LayoutBitTable from "./LayoutBitTable";

const ModuleLayout = (props) => {
  const key = () => props.key;
  const obj = () => props.obj;

  return (
    <>
      <div>
        <LayoutBitTable layout={obj()} />
      </div>
    </>
  );
};

export default ModuleLayout;
