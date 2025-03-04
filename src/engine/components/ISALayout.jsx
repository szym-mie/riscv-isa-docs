import BitTable from "./BitTable";

const ISALayout = (props) => {
  const key = () => props.key;
  const obj = () => props.obj;

  return (
    <>
      <div>
        <BitTable fields={obj().fields} />
      </div>
    </>
  );
};

export default ISALayout;
