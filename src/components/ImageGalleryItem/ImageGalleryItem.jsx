import { StyledImageGalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ toggleModal, smallImageUrl, largeImageUrl }) => {
    return <>
        <StyledImageGalleryItem>
            <GalleryItemImage src={smallImageUrl} alt="" data-url={largeImageUrl} onClick={toggleModal} />
        </StyledImageGalleryItem>
    </>
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    smallImageUrl: PropTypes.PropTypes.string.isRequired,
    largeImageUrl: PropTypes.PropTypes.string.isRequired,
}
