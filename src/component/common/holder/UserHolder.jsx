import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import CardHolder from './CardHolder';

const UserHolder = ({ children }) => {
  const backgroundColor = useColorModeValue('gray.300', 'gray.600');
  return (
    <Box
      gap={2}
      padding={4}
      backgroundColor={backgroundColor}
      borderRadius={'md'}
      boxShadow={'inner'}
    >
      <CardHolder>{children}</CardHolder>
    </Box>
  );
};

export default UserHolder;
