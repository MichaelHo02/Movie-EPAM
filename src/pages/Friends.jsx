import { Box } from '@chakra-ui/react';
import React from 'react';
import CardHolder from '../component/common/cardHolder/CardHolder';
import SearchUser from '../component/friends/SearchUser';

const Friends = () => {
  return (
    <Box marginBottom={10}>
      <SearchUser />
      <CardHolder></CardHolder>
    </Box>
  );
};

export default Friends;
