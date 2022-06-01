import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../component/common/card/Card';
import CardController from '../component/common/cardController/CardController';
import PaginationController from '../component/common/cardController/PaginationController';
import CardHolder from '../component/common/cardHolder/CardHolder';
import { getFilmInfo, getFilterInfo } from '../redux/selectors';
import { fetchLikesAndFavorites } from '../redux/slices/filmSlide';
import { fetchTV } from '../redux/slices/filterSlice';

const TvShows = () => {
  const dispatch = useDispatch();
  const filterInfo = useSelector(getFilterInfo);
  const filmInfo = useSelector(getFilmInfo);
  useEffect(() => {
    if (filterInfo.status === 'idle') {
      dispatch(fetchLikesAndFavorites());
    }
    if (filmInfo.status === 'idle') {
      dispatch(fetchTV());
    }
  }, [dispatch, filmInfo.status, filterInfo.status]);

  return (
    <Box marginBottom={10}>
      <CardController />
      <CardHolder>
        {filterInfo.pagination.results &&
          filterInfo.pagination.results.map((card, index) => {
            return (
              <Card
                key={index}
                date={card.first_air_date}
                title={card.name}
                {...card}
                variant={'tv'}
                currentStatusLike={filmInfo.data.likesId[`${card.id}`]}
                currentStatusFavorite={filmInfo.data.favoritesId[`${card.id}`]}
              />
            );
          })}
      </CardHolder>
      <PaginationController />
    </Box>
  );
};

export default TvShows;
