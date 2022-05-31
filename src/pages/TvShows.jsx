import React, { useEffect } from 'react';
import Authentication from '../component/common/auth/Authentication';
import CardHolder from '../component/common/cardHolder/CardHolder';
import CardController from '../component/common/cardController/CardController';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTV } from '../redux/slices/filterSlice';
import { getFilmInfo } from '../redux/selectors';
import Card from '../component/common/card/Card';

const TvShows = () => {
  const dispatch = useDispatch();
  const selector = useSelector(getFilmInfo);
  useEffect(() => {
    dispatch(fetchTV());
  }, [dispatch]);
  console.log(selector);
  return (
    <>
      <Authentication>
        <CardController />
        <CardHolder>
          {selector.results &&
            selector.results.map((card, index) => {
              return (
                <Card
                  key={index}
                  date={card.first_air_date}
                  title={card.original_name}
                  {...card}
                />
              );
            })}
        </CardHolder>
      </Authentication>
    </>
  );
};

export default TvShows;
