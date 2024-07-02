/* eslint-disable react/prop-types */
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import mobile from "../../images/mobile.png";
import LeftButton from "./LeftButton";
import RightButton from "./RightButton";
import "./productgallery.css";
const ProductGallery = ({ images }) => {
  if (!images) return null;
  const processedImages = images.map((img) => {
    return { original: img };
  });

  return (
    <div
      className="product-gallary-card d-flex justfiy-content-center  align-items-center
        pt-2"
    >
      <ImageGallery
        items={processedImages || []}
        defaultImage={mobile}
        showFullscreenButton={false}
        isRTL={true}
        showPlayButton={false}
        showThumbnails={false}
        renderRightNav={RightButton}
        renderLeftNav={LeftButton}
      />
    </div>
  );
};

export default ProductGallery;
