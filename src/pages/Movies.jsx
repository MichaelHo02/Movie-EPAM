import { Box, Skeleton } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../component/common/card/Card';
import FilterController from '../component/common/cardController/FilterController';
import PaginationController from '../component/common/cardController/pagination/PaginationController';
import CardHolder from '../component/common/holder/CardHolder';
import { getFilmInfo, getFilterInfo } from '../redux/selectors';
import { fetchLikesAndFavorites } from '../redux/slices/filmSlice';
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
      <FilterController variant={'movie'} />
      <Skeleton isLoaded={filterInfo.status !== 'pending'}>
        <PaginationController />
      </Skeleton>
      <Skeleton isLoaded={filterInfo.status !== 'pending'}>
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
                  currentStatusFavorite={
                    filmInfo.data.favoritesId[`${card.id}`]
                  }
                />
              );
            })}
        </CardHolder>
      </Skeleton>
      <Skeleton isLoaded={filterInfo.status !== 'pending'}>
        <PaginationController />
      </Skeleton>
    </Box>
  );
};

export default Movies;
