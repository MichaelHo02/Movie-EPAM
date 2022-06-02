import { Box, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../component/common/card/Card';
import PaginationController from '../component/common/cardController/PaginationController';
import CardHolder from '../component/common/holder/CardHolder';
import Holder from '../component/common/holder/Holder';
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
      <Holder marginY={8}>
        <Heading padding={4} fontSize={'3xl'}>
          Your Favorite TV Shows & Movie
        </Heading>
      </Holder>
      <PaginationController />
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
      <PaginationController />
    </Box>
  );
};

export default Favorite;
