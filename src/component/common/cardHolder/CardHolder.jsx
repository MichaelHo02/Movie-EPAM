import { Flex, Grid } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Card from '../card/Card';

const CardHolder = ({ children }) => {
  return (
    <>
      <Grid
        gridTemplateColumns={{
          xl: 'repeat(4, 1fr)',
          lg: 'repeat(3, 1fr)',
          md: 'repeat(2, 1fr)',
          sm: 'repeat(1, 1fr)',
        }}
        gridGap={5}
      >
        {children}
      </Grid>
    </>
  );
};

export default CardHolder;
