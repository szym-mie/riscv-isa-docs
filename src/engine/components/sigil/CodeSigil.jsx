import Code from "../core/Code";

const CodeSigil = (props) => {
  const lang = () => props.item.lang;
  const text = () => props.item.text;

  return (
    <>
      <Code lang={lang()}>{text()}</Code>
    </>
  );
};

export default CodeSigil;
