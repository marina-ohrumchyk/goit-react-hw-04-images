import { Container } from './App.styled';
import Modal from './Modal/Modal';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreButton from './Button/LoadMoreButton';
import {Loader} from 'components/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import { getApi } from 'services/getApi';
import usePrevious from '../Hooks/usePrevious';
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from 'react';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imageToShow, setImageToShow] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const prevPage = usePrevious(page);
  const prevSearchText = usePrevious(searchText);

  useEffect(() => {
    if (searchText === "") return;
    if (prevPage !== page || prevSearchText !== searchText) {
			getApi(searchText, page)
      .then((response) => response.json())
        .then((data) => {
            const newImages = data.hits.map((image) => ({ id: image.id, smallImageUrl: image.webformatURL, largeImageUrl: image.largeImageURL }));
            setImages(images.concat(newImages))
				})
				.catch((error) => {
					setError(error)
				})
			    .finally(() => {
				    setIsLoading(false)
			})
		}
  }, [page, searchText, images, error, prevPage, prevSearchText])

  const toggleModal = (event) => {
    if (event && event.currentTarget) {
      const bigImageUrl = event.currentTarget.dataset.url;
      setImageToShow(bigImageUrl)
    } 
    setShowModal(!showModal)
  }

  const handleSearchbarSubmit = search => {
    if (search !== searchText) {
      setSearchText(search);
      setIsLoading(true);
      setImages([]);
      setPage(1);
    }
  }

  const handleLoadMore = e => {
    setPage(page + 1)
  }

  return (
       <Container>
         {showModal && <Modal imageToShow={ imageToShow } onClose={toggleModal}>
         </Modal>}
         <Searchbar handleSearchbarSubmit={handleSearchbarSubmit} />
         <ToastContainer autoClose={3000}/>
         {isLoading && <Loader/>}
         {images && (
           <ImageGallery toggleModal={toggleModal} images={images} />
         )}
         {images.length !== 0 && (
          <LoadMoreButton handleLoadMore={handleLoadMore}/>
         )}
    </Container>
  );
}

export default App;
