import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const AccordionHolder = ({ children }) => {
  const backgroundColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      marginY={4}
      backgroundColor={backgroundColor}
      borderRadius={'md'}
      boxShadow={'md'}
      width={'full'}
    >
      {children}
    </Box>
  );
};

export default AccordionHolder;
