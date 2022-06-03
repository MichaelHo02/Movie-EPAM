import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { ButtonGroup, Flex, Spacer, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterInfo } from '../../../../redux/selectors';
import { fetchMovie, fetchTV } from '../../../../redux/slices/filterSlice';
import Holder from '../../holder/Holder';
import PaginationButton from './PaginationButton';

const PaginationController = ({ variant }) => {
  const dispatch = useDispatch();
  const selector = useSelector(getFilterInfo).pagination;
  return (
    <Holder>
      <Flex alignItems={'center'} padding={4} gap={2}>
        <Text
          fontSize={'xl'}
        >{`Page: ${selector.page} / ${selector.total_pages}`}</Text>
        <Spacer />
        <ButtonGroup>
          <PaginationButton
            icon={<ArrowLeftIcon />}
            onClick={() => {
              if (variant === 'tv') dispatch(fetchTV(-1));
              else dispatch(fetchMovie(-1));
              window.scrollTo(0, 0);
            }}
            isDisabled={selector.page === 1}
          />
          <PaginationButton
            icon={<ArrowRightIcon />}
            onClick={() => {
              if (variant === 'tv') dispatch(fetchTV(1));
              else dispatch(fetchMovie(1));
              window.scrollTo(0, 0);
            }}
            isDisabled={selector.page === selector.total_pages}
          />
        </ButtonGroup>
      </Flex>
    </Holder>
  );
};

export default PaginationController;
