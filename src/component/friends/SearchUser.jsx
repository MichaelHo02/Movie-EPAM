import { SearchIcon } from '@chakra-ui/icons';
import { IconButton, Input, Stack, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../../redux/slices/friendSlice';
import Holder from '../common/holder/Holder';

const SearchUser = () => {
  const borderColor = useColorModeValue('gray.400', 'gray.500');
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(fetchUsers(value));
    setValue('');
  };
  return (
    <Holder>
      <Stack padding={4} gap={2} direction={['column', 'row']}>
        <Input
          placeholder={'Find friends by username'}
          _placeholder={{ opacity: 0.8, color: 'inherit' }}
          size={'lg'}
          borderColor={borderColor}
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
    </Holder>
  );
};

export default SearchUser;
