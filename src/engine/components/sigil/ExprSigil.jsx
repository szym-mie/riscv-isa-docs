const ExprSigil = (props) => {
  const text = () => props.item.text;

  return (
    <>
      <pre>{text()}</pre>
    </>
  );
};

export default ExprSigil;
