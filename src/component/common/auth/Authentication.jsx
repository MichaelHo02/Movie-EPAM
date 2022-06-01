import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getResponse } from '../../../redux/selectors';

const Authentication = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const validation = useSelector(getResponse).success;
  useEffect(() => {
    if (!validation) {
      navigate('/');
    } else if (validation && location.pathname === '/') {
      navigate('/home');
    }
  }, [location.pathname, navigate, validation]);
  return <>{children}</>;
};

export default Authentication;
