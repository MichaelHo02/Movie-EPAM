import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { ButtonGroup, Flex, Spacer, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilmInfo } from '../../../../redux/selectors';
import {
  decrementPage,
  incrementPage
} from '../../../../redux/slices/filmSlice';
import Holder from '../../holder/Holder';
import PaginationButton from './PaginationButton';

const PaginationForList = ({ displayNumber }) => {
  const dispatch = useDispatch();
  const filmInfo = useSelector(getFilmInfo);
  const films = filmInfo.data.favorites;
  const maxPage = Math.floor(films.length / displayNumber) + 1;
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(filmInfo.data.page);
  }, [filmInfo.data.page]);
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
