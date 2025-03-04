const Author = (props) => {
  const obj = () => props.obj;

  return (
    <>
      <div>
        <h4>{obj().full_name}</h4>
        <p>email: {obj().email}</p>
      </div>
    </>
  )
};

export default Author;
