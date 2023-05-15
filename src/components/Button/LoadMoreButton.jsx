import { StyledButton } from "./LoadMoreButton.styled";
import { ButtonContainer } from "./LoadMoreButton.styled";
import PropTypes from 'prop-types';

const LoadMoreButton = ({handleLoadMore}) => {
    return <ButtonContainer>
            <StyledButton onClick={handleLoadMore}>Load more</StyledButton>
        </ButtonContainer>
 }

export default LoadMoreButton;

LoadMoreButton.propTypes = {
    handleLoadMore: PropTypes.func.isRequired,
}