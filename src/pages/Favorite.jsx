import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../component/common/card/Card';
import CardHolder from '../component/common/cardHolder/CardHolder';
import { getFilmInfo } from '../redux/selectors';
import { fetchLikesAndFavorites } from '../redux/slices/filmSlide';

const Favorite = () => {
  const dispatch = useDispatch();
  const filmInfo = useSelector(getFilmInfo);
  useEffect(() => {
    dispatch(fetchLikesAndFavorites());
  }, []);
  console.log(filmInfo);
  return (
    <Box marginY={10}>
      <CardHolder>
        {filmInfo.data.favorites &&
          filmInfo.data.favorites.map(card => {
            return (
              <Card
                key={card.id}
                date={card.first_air_date}
                title={card.name}
                {...card}
                country={card.origin_country}
                countryDesc={'Origin Country'}
                variant={'tv'}
                currentStatusLike={filmInfo.data.likesId[`${card.id}`]}
                currentStatusFavorite={filmInfo.data.favoritesId[`${card.id}`]}
              />
            );
          })}
      </CardHolder>
    </Box>
  );
};

export default Favorite;
