import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Authentication = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('auth_WeWatch') !== '123456789') {
      navigate('/');
    }
  }, []);
  return <>{children}</>;
};

export default Authentication;
