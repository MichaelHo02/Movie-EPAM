import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getFilmInfo } from '../redux/selectors';
import { fetchMovie, fetchTV } from '../redux/slices/filmSlice';

const Film = () => {
  const [location] = useSearchParams();
  const dispatch = useDispatch();
  const film = useSelector(getFilmInfo).data.film;
  const id = location.get('id');
  const variant = location.get('variant');

  useEffect(() => {
    console.log(id);
    if (variant === 'tv') {
      dispatch(fetchTV(id));
    } else {
      dispatch(fetchMovie(id));
    }
  }, []);
  console.log(film);
  return <div>Film</div>;
};

export default Film;
