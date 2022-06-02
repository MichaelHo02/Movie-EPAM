import { Box, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../component/common/card/Card';
import PaginationForList from '../component/common/cardController/pagination/PaginationForList';
import CardHolder from '../component/common/holder/CardHolder';
import Holder from '../component/common/holder/Holder';
import { getFilmInfo } from '../redux/selectors';
import { fetchLikesAndFavorites } from '../redux/slices/filmSlice';

const Favorite = ({ displayNumber }) => {
  const dispatch = useDispatch();
  const filmInfo = useSelector(getFilmInfo);
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(fetchLikesAndFavorites());
  }, []);
  const films = filmInfo.data.favorites;
  useEffect(() => {
    setPage(filmInfo.data.page);
  }, [filmInfo.data.page]);
  const start = (page - 1) * displayNumber;
  let displayFilm = films.slice(start, start + displayNumber);
  return (
    <Box marginY={10}>
      <Holder marginY={8}>
        <Heading padding={4} fontSize={'3xl'}>
          Your Favorite TV Shows & Movie
        </Heading>
      </Holder>
      <PaginationForList />
      <CardHolder>
        {displayFilm &&
          displayFilm.map(card => {
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
      <PaginationForList />
    </Box>
  );
};

export default Favorite;
