import React from 'react';
import Authentication from '../component/common/auth/Authentication';
import CardHolder from '../component/common/cardHolder/CardHolder';
import CardController from '../component/common/cardController/CardController';

const TvShows = () => {
  return (
    <>
      <Authentication>
        <CardController />
        <CardHolder />
      </Authentication>
    </>
  );
};

export default TvShows;
