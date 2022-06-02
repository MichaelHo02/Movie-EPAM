import { SearchIcon } from '@chakra-ui/icons';
import {
  Box, IconButton,
  Input,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import { useState } from 'react';

const SearchUser = () => {
  const backgroundColor = useColorModeValue('gray.200', 'gray.700');
  const [value, setValue] = useState('');
  return (
    <Box
      marginY={4}
      backgroundColor={backgroundColor}
      borderRadius={'md'}
      boxShadow={'md'}
      width={'full'}
    >
      <Stack padding={4} gap={2} direction={['column', 'row']}>
        <Input
          placeholder={'Find friends by username'}
          _placeholder={{ opacity: 0.8, color: 'inherit' }}
          size={'lg'}
          focusBorderColor={'teal.500'}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <IconButton
          icon={<SearchIcon />}
          size={'lg'}
          colorScheme={'teal'}
          variant={'outline'}
        />
      </Stack>
    </Box>
  );
};

export default SearchUser;
