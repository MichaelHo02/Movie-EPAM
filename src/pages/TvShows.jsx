import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../component/common/card/Card';
import CardController from '../component/common/cardController/CardController';
import CardHolder from '../component/common/cardHolder/CardHolder';
import { getFilmInfo } from '../redux/selectors';
import { fetchTV } from '../redux/slices/filterSlice';

const TvShows = () => {
  const dispatch = useDispatch();
  const selector = useSelector(getFilmInfo);
  useEffect(() => {
    dispatch(fetchTV());
  }, [dispatch]);
  console.log(selector.results);
  return (
    <>
      <CardController />
      <CardHolder>
        {selector.results &&
          selector.results.map((card, index) => {
            return (
              <Card
                key={index}
                date={card.first_air_date}
                title={card.name}
                {...card}
                variant={'tv'}
              />
            );
          })}
      </CardHolder>
    </>
  );
};

export default TvShows;
