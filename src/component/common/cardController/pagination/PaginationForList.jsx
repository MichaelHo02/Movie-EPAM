import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { ButtonGroup, Flex, Spacer, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  decrementPage,
  incrementPage
} from '../../../../redux/slices/filmSlice';
import Holder from '../../holder/Holder';
import PaginationButton from './PaginationButton';

const PaginationForList = ({ displayNumber, currentPage, currentFilms }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [films, setFilms] = useState([]);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setFilms(currentFilms);
  }, [currentFilms]);

  useEffect(() => {
    setMaxPage(Math.ceil(films.length / displayNumber));
  }, [displayNumber, films.length]);

  useEffect(() => {
    if (currentPage > maxPage) {
      dispatch(decrementPage());
    }
  }, [currentPage, dispatch, maxPage]);

  return (
    <Holder>
      <Flex alignItems={'center'} padding={4} gap={2}>
        <Text fontSize={'xl'}>{`Page: ${page} / ${maxPage} `}</Text>
        <Spacer />
        <ButtonGroup>
          <PaginationButton
            icon={<ArrowLeftIcon />}
            onClick={() => {
              dispatch(decrementPage());
            }}
            isDisabled={page === 1}
          />
          <PaginationButton
            icon={<ArrowRightIcon />}
            onClick={() => {
              dispatch(incrementPage(maxPage));
            }}
            isDisabled={page === maxPage}
          />
        </ButtonGroup>
      </Flex>
    </Holder>
  );
};

export default PaginationForList;
