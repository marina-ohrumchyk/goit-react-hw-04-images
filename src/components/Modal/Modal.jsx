import { Overlay, StyledModal } from "./Modal.styled";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import { useEffect } from "react";

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, imageToShow }) => {

    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        }; 
        const handleBackdropClick = e => {
            if (e.target.nodeName === 'DIV') {
                onClose();
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('click', handleBackdropClick);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('click', handleBackdropClick);
        }
    }, [onClose])

    return createPortal (
        <Overlay>
            <StyledModal>
                <img src={imageToShow} alt=""/>
            </StyledModal>
        </Overlay>, modalRoot
    )
}

export default Modal;

Modal.propTypes = {
    imageToShow: PropTypes.string.isRequired,
}
