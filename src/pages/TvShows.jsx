import { Box, Skeleton } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../component/common/card/Card';
import FilterController from '../component/common/cardController/FilterController';
import PaginationController from '../component/common/cardController/pagination/PaginationController';
import CardHolder from '../component/common/holder/CardHolder';
import { getFilmInfo, getFilterInfo } from '../redux/selectors';
import { fetchLikesAndFavorites } from '../redux/slices/filmSlice';
import { fetchTV } from '../redux/slices/filterSlice';

const TvShows = () => {
  const dispatch = useDispatch();
  const filterInfo = useSelector(getFilterInfo);
  const filmInfo = useSelector(getFilmInfo);
  useEffect(() => {
    dispatch(fetchLikesAndFavorites());
    dispatch(fetchTV());
  }, [dispatch]);

  return (
    <Box marginBottom={10}>
      <FilterController variant={'tv'} />
      <Skeleton isLoaded={filterInfo.status !== 'pending'}>
        <PaginationController variant={'tv'} />
      </Skeleton>
      <Skeleton isLoaded={filterInfo.status !== 'pending'}>
        <CardHolder>
          {filterInfo.pagination.results &&
            filterInfo.pagination.results.map((card, index) => {
              return (
                <Card
                  key={index}
                  date={card.first_air_date}
                  title={card.name}
                  {...card}
                  country={card.origin_country}
                  countryDesc={'Origin Country'}
                  variant={'tv'}
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
        <PaginationController variant={'tv'} />
      </Skeleton>
    </Box>
  );
};

export default TvShows;
