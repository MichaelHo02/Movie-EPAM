import { IconButton } from '@chakra-ui/react';
import React from 'react';

const PaginationButton = ({ icon, onClick, isDisabled }) => {
  return (
    <IconButton
      icon={icon}
      colorScheme={'teal'}
      variant={'outline'}
      onClick={onClick}
      isDisabled={isDisabled}
    />
  );
};

export default PaginationButton;
