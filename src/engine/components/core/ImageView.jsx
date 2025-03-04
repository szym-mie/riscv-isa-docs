import { Suspense } from 'solid-js';

const ImageView = (props) => {
  return (
    <>
      <img src={props.src} alt={props.alt} />
    </>
  );
};

export default ImageView;
