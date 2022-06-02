import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const Holder = ({ children, props, marginY = 4, variant = 'base' }) => {
  let backgroundColor1 = useColorModeValue('gray.200', 'gray.700');
  let backgroundColor2 = useColorModeValue('gray.300', 'gray.600');
  return (
    <Box
      marginY={marginY}
      backgroundColor={variant === 'base' ? backgroundColor1 : backgroundColor2}
      borderRadius={'md'}
      boxShadow={variant === 'base' ? 'md' : 'inner'}
      width={'full'}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Holder;
