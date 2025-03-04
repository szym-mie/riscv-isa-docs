import ImageView from "../core/ImageView";

const ImageSigil = (props) => {
  const url = () => props.item.url;

  return (
    <>
      <ImageView src={url()} alt={url()} />
    </>
  );
};

export default ImageSigil;
