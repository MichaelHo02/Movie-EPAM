import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  IconButton,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../../redux/slices/friendSlice';

const SearchUser = () => {
  const backgroundColor = useColorModeValue('gray.200', 'gray.700');
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(fetchUsers(value));
    setValue('');
  };
  return (
    <Box
      marginY={8}
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
          variant={'filled'}
          focusBorderColor={'teal.500'}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <IconButton
          icon={<SearchIcon />}
          size={'lg'}
          colorScheme={'teal'}
          variant={'outline'}
          onClick={handleSearch}
        />
      </Stack>
    </Box>
  );
};

export default SearchUser;
