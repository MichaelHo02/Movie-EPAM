import { Box, Heading, Skeleton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../component/common/card/Card';
import PaginationForList from '../component/common/cardController/pagination/PaginationForList';
import CardHolder from '../component/common/holder/CardHolder';
import Holder from '../component/common/holder/Holder';
import { getFilmInfo } from '../redux/selectors';
import {
  decrementPage,
  fetchLikesAndFavorites,
  incrementPage,
} from '../redux/slices/filmSlice';

const displayNumber = 20;

const Favorite = () => {
  const dispatch = useDispatch();
  const filmInfo = useSelector(getFilmInfo);
  const [page, setPage] = useState(1);
  const [films, setFilms] = useState([]);
  useEffect(() => {
    dispatch(fetchLikesAndFavorites());
  }, []);

  useEffect(() => {
    setFilms(filmInfo.data.favorites);
  }, [filmInfo.data.favorites]);

  useEffect(() => {
    setPage(filmInfo.data.page);
  }, [filmInfo.data.page]);
  const start = (page - 1) * displayNumber;
  const maxPage = Math.ceil(films.length / displayNumber);
  const displayFilms = films.slice(start, start + displayNumber);
  return (
    <Box marginY={10}>
      <Holder marginY={8}>
        <Heading padding={4} fontSize={'3xl'}>
          Your Favorite TV Shows & Movie
        </Heading>
      </Holder>
      <Skeleton isLoaded={filmInfo.status !== 'pending'}>
        <PaginationForList
          currentPage={page}
          currentMaxPage={maxPage}
          incrementPage={incrementPage}
          decrementPage={decrementPage}
        />
      </Skeleton>
      <Skeleton isLoaded={filmInfo.status !== 'pending'}>
        <CardHolder>
          {displayFilms &&
            displayFilms.map(card => {
              return (
                <Card
                  key={card.id}
                  title={card.name}
                  {...card}
                  country={card.country}
                  countryDesc={
                    card.variant === 'tv'
                      ? 'Origin Country'
                      : 'Original language'
                  }
                  variant={card.variant}
                  currentStatusLike={filmInfo.data.likesId[`${card.id}`]}
                  currentStatusFavorite={
                    filmInfo.data.favoritesId[`${card.id}`]
                  }
                />
              );
            })}
        </CardHolder>
      </Skeleton>
      <Skeleton isLoaded={filmInfo.status !== 'pending'}>
        <PaginationForList
          currentPage={page}
          currentMaxPage={maxPage}
          incrementPage={incrementPage}
          decrementPage={decrementPage}
        />
      </Skeleton>
    </Box>
  );
};

export default Favorite;
