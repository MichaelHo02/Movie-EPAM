import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const Holder = ({ children, props, marginY = 4 }) => {
  const backgroundColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      marginY={marginY}
      backgroundColor={backgroundColor}
      borderRadius={'md'}
      boxShadow={'md'}
      width={'full'}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Holder;
