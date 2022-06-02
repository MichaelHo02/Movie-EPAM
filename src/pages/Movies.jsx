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
    dispatch(fetchLikesAndFavorites());
    dispatch(fetchMovie());
  }, [dispatch]);
  console.log(filmInfo);
  return (
    <Box marginBottom={10}>
      <CardController variant={'movie'} />
      <CardHolder>
        {filterInfo.pagination.results &&
          filterInfo.pagination.results.map(card => {
            return (
              <Card
                key={card.id}
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
