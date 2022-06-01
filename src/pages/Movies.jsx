import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../component/common/card/Card';
import CardController from '../component/common/cardController/CardController';
import CardHolder from '../component/common/cardHolder/CardHolder';
import { getFilmInfo, getFilterInfo } from '../redux/selectors';
import { fetchLikesAndFavorites } from '../redux/slices/filmSlide';
import { fetchMovie } from '../redux/slices/filterSlice';

const Movies = () => {
  const dispatch = useDispatch();
  const filterInfo = useSelector(getFilterInfo);
  const filmInfo = useSelector(getFilmInfo);

  useEffect(() => {
    if (filterInfo.status === 'idle') {
      dispatch(fetchLikesAndFavorites());
    }
    if (filmInfo.status === 'idle') {
      dispatch(fetchMovie());
    }
  }, [dispatch, filmInfo.status, filterInfo.status]);
  console.log(filmInfo);
  return (
    <Box marginBottom={10}>
      <CardController />
      <CardHolder>
        {filterInfo.pagination.results &&
          filterInfo.pagination.results.map((card, index) => {
            return (
              <Card
                key={index}
                date={card.release_date}
                title={card.name}
                {...card}
                country={card.original_language}
                countryDesc={'Original language'}
                variant={'movie'}
                currentStatusLike={filmInfo.data.likesId[`${card.id}`]}
                currentStatusFavorite={filmInfo.data.favoritesId[`${card.id}`]}
              />
            );
          })}
      </CardHolder>
    </Box>
  );
};

export default Movies;
